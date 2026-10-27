const SITE = 'https://www.traveliles.com';
const GRAPH = 'https://graph.facebook.com/v26.0';
const REBUILD_CRON = '0 2,4,6,8,10,12,14,16 * * *';
// Never flood the Page if many articles go live at once (e.g. after an outage)
const MAX_POSTS_PER_RUN = 2;

export default {
	async scheduled(event, env) {
		if (event.cron === REBUILD_CRON) {
			const res = await fetch(env.DEPLOY_HOOK_URL, { method: 'POST' });
			if (!res.ok) throw new Error(`Deploy hook failed: ${res.status}`);
		} else {
			await postNewArticles(env);
		}
	},
};

// Runs 20 min after each rebuild, once the new build is live.
async function postNewArticles(env) {
	if (!env.FB_PAGE_ID || !env.FB_PAGE_TOKEN) return;

	const res = await fetch(`${SITE}/search-index.json?t=${Date.now()}`);
	if (!res.ok) throw new Error(`Search index fetch failed: ${res.status}`);
	const articles = (await res.json())
		.filter((item) => item.type === 'article')
		.sort((a, b) => a.date.localeCompare(b.date));

	const stored = await env.FB_POSTED.get('posted', 'json');
	// First run: everything already online counts as posted, so old articles are never shared
	if (!stored) {
		await env.FB_POSTED.put('posted', JSON.stringify(articles.map((a) => a.url)));
		return;
	}

	const posted = new Set(stored);
	const pending = articles.filter((a) => !posted.has(a.url)).slice(0, MAX_POSTS_PER_RUN);
	for (const article of pending) {
		const body = new URLSearchParams({
			message: article.excerpt || article.title,
			link: SITE + encodeURI(article.url),
			access_token: env.FB_PAGE_TOKEN,
		});
		const fb = await fetch(`${GRAPH}/${env.FB_PAGE_ID}/feed`, { method: 'POST', body });
		if (!fb.ok) throw new Error(`Facebook post failed for ${article.url}: ${fb.status} ${await fb.text()}`);
		posted.add(article.url);
		await env.FB_POSTED.put('posted', JSON.stringify([...posted]));
	}
}

import { isLive } from '../lib/utils';
import { getCollection } from 'astro:content';
import { facebookCaption } from '../lib/facebook';

// Read by the scheduled Worker (workers/scheduled-rebuild) to post new articles to the Facebook Page.
export async function GET({ site }: { site: URL }) {
	const articles = (await getCollection('articles'))
		.filter((article) => isLive(article))
		.map((article) => {
			const url = `/articles/${article.id}`;
			return {
				url,
				date: article.data.date.toISOString(),
				message: facebookCaption(article, new URL(encodeURI(url), site).href),
			};
		});

	return new Response(JSON.stringify(articles), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
}

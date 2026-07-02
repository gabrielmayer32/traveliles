import { getCollection } from 'astro:content';

export async function GET() {
	const articles = (await getCollection('articles_en'))
		.filter((a) => a.data.published)
		.map((a) => ({
			title: a.data.title,
			excerpt: a.data.excerpt,
			category: a.data.category,
			date: a.data.date.toISOString(),
			url: `/en/articles/${a.id}`,
			type: 'article',
			cover: a.data.cover ?? null,
		}));

	const videos = (await getCollection('videos_en'))
		.filter((v) => v.data.published)
		.map((v) => ({
			title: v.data.title,
			excerpt: v.data.excerpt,
			category: v.data.category,
			date: v.data.date.toISOString(),
			url: `/en/videos/${v.id}`,
			type: 'video',
			thumbnail: v.data.thumbnail ?? null,
		}));

	return new Response(JSON.stringify([...articles, ...videos]), {
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
}

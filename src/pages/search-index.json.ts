import { getCollection } from 'astro:content';
import { isVisible } from '../lib/utils';

export async function GET() {
	const articles = (await getCollection('articles'))
		.filter((article) => isVisible(article))
		.map((article) => ({
			title: article.data.title,
			excerpt: article.data.excerpt,
			category: article.data.category,
			date: article.data.date.toISOString(),
			url: `/articles/${article.id}`,
			type: 'article',
			cover: article.data.cover ?? null,
		}));

	const videos = (await getCollection('videos'))
		.filter((video) => isVisible(video))
		.map((video) => ({
			title: video.data.title,
			excerpt: video.data.excerpt,
			category: video.data.category,
			date: video.data.date.toISOString(),
			url: `/videos/${video.id}`,
			type: 'video',
			thumbnail: video.data.thumbnail ?? null,
		}));

	return new Response(JSON.stringify([...articles, ...videos]), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
}

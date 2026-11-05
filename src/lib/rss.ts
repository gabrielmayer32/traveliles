import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { isLive } from './utils';

const FEEDS = {
	fr: {
		articles: 'articles',
		videos: 'videos',
		prefix: '',
		title: 'Travel-Îles',
		description: "Magazine éditorial de l'île Maurice : voyages, saveurs, cultures, régions et art de vivre dans l'océan Indien.",
		language: 'fr-FR',
	},
	en: {
		articles: 'articles_en',
		videos: 'videos_en',
		prefix: '/en',
		title: 'Travel-Îles (English)',
		description: 'Editorial magazine from Mauritius: travel, food, culture, regions and the art of living in the Indian Ocean.',
		language: 'en-GB',
	},
} as const;

export async function buildFeed(locale: keyof typeof FEEDS, site: URL) {
	const feed = FEEDS[locale];
	const [articles, videos] = await Promise.all([getCollection(feed.articles), getCollection(feed.videos)]);
	const items = [
		...articles.filter((a) => isLive(a) && !!a.data.title).map((a) => ({ entry: a, path: `${feed.prefix}/articles/${a.id}/` })),
		...videos.filter((v) => isLive(v) && !!v.data.title).map((v) => ({ entry: v, path: `${feed.prefix}/videos/${v.id}/` })),
	]
		.sort((a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf())
		.slice(0, 50);

	return rss({
		title: feed.title,
		description: feed.description,
		site,
		customData: `<language>${feed.language}</language>`,
		items: items.map(({ entry, path }) => ({
			title: entry.data.title,
			description: entry.data.excerpt,
			pubDate: entry.data.date,
			link: path,
			categories: [entry.data.category],
		})),
	});
}

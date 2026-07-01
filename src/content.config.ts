import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categoryEnum = z.enum([
	'Hôtellerie',
	'Gastronomie',
	'Immobilier de luxe',
	'Art de vivre',
	'Golf',
	'Écotourisme',
	'Culture',
]); // TODO: update from form answers

const articles = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/articles' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		category: categoryEnum,
		cover: z.string().optional(),
		excerpt: z.string(),
		author: z.string().default('Travel-Îles'),
		tags: z.array(z.string()).default([]),
		published: z.boolean().default(true),
	}),
});

const videos = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/videos' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		category: categoryEnum,
		videoSource: z.enum(['youtube', 'vimeo']),
		videoId: z.string(),
		thumbnail: z.string().optional(),
		excerpt: z.string(),
		published: z.boolean().default(true),
	}),
});

export const collections = { articles, videos };

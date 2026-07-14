import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categoryEnum = z.enum([
	'Rencontres',
	'Nos Ambassadeurs',
	'Nos régions',
	'Savoir-faire',
	'Héritage',
	'Maurice demain',
	"Mémoires d'îles",
	'Saveurs',
	'Art & Culture',
	'Activités & Événements',
	'News',
	'Nos adresses',
	'Escapades',
]);

const articleSchema = z.object({
	title: z.string(),
	date: z.coerce.date(),
	category: categoryEnum,
	cover: z.string().optional(),
	excerpt: z.string(),
	author: z.string().default('Travel-Îles'),
	tags: z.array(z.string()).default([]),
	published: z.boolean().default(true),
});

const videoSchema = z.object({
	title: z.string(),
	date: z.coerce.date(),
	category: categoryEnum,
	videoSource: z.enum(['youtube', 'vimeo', 'facebook', 'instagram', 'r2']),
	videoId: z.string().optional(),
	videoFile: z.string().optional(),
	thumbnail: z.string().optional(),
	excerpt: z.string(),
	published: z.boolean().default(true),
});

const heroSchema = z.object({
	title: z.string(),
	label: z.string().optional(),
	excerpt: z.string().optional(),
	videoFile: z.string(),
	poster: z.string().optional(),
	published: z.boolean().default(true),
});

const partnersSchema = z.object({
	partners: z.array(z.object({
		name: z.string(),
		logo: z.string(),
		url: z.string().optional(),
	})).default([]),
});

const hero = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/hero' }),
	schema: heroSchema,
});

const articles = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/articles/fr' }),
	schema: articleSchema,
});

const articles_en = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/articles/en' }),
	schema: articleSchema,
});

const videos = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/videos/fr' }),
	schema: videoSchema,
});

const partners = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/partners' }),
	schema: partnersSchema,
});

export const collections = { articles, articles_en, videos, hero, partners };

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categoryEnum = z.enum([
	'Un visage, une histoire',
	'Les gardiens du Savoir Faire',
	'24heures avec....',
	'Maurice demain',
	"Mémoires de l'Île",
	'Saveurs',
	'Nos régions',
	'Art & culture',
	'Activités & événements',
	'Nos Ambassadeurs régionaux',
	'Nos adresses',
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
	videoSource: z.enum(['youtube', 'vimeo', 'facebook', 'instagram']),
	videoId: z.string(),
	thumbnail: z.string().optional(),
	excerpt: z.string(),
	published: z.boolean().default(true),
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

export const collections = { articles, articles_en, videos };

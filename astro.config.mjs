// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

// Sätteri hast plugin: inject alt text on body images that have none
const imgAltFallback = {
	name: 'img-alt-fallback',
	element(node) {
		if (node.tagName !== 'img') return;
		const props = node.properties ?? {};
		const alt = props.alt;
		if (!alt || alt === '') {
			const src = String(props.src ?? '');
			const filename = src.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
			node.properties = {
				...props,
				alt: filename.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
			};
		}
	},
};

// https://astro.build/config
export default defineConfig({
	site: 'https://www.traveliles.com',
	output: 'static',
	i18n: {
		defaultLocale: 'fr',
		locales: ['fr', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	markdown: {
		processor: satteri({ hastPlugins: [imgAltFallback] }),
	},
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'fr',
				locales: { fr: 'fr-FR', en: 'en-GB' },
			},
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Playfair Display',
			cssVariable: '--font-display',
			weights: ['400', '500', '600', '700', '800', '900'],
			styles: ['normal', 'italic'],
			subsets: ['latin', 'latin-ext'],
		},
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-body',
			weights: ['400', '500', '600', '700'],
			styles: ['normal'],
			subsets: ['latin', 'latin-ext'],
		},
	],
});

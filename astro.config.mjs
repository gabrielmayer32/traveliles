// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { copyFile, mkdir, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Copies the WebP variants made by src/lib/images.ts that the built pages actually reference. */
const responsiveImages = {
	name: 'ti-responsive-images',
	hooks: {
		/** @param {{ dir: URL }} options */
		'astro:build:done': async ({ dir }) => {
			const outDir = fileURLToPath(dir);
			const cacheDir = path.resolve('node_modules/.astro/ti-img');
			const used = new Set();
			for (const entry of await readdir(outDir, { recursive: true })) {
				if (!entry.endsWith('.html')) continue;
				const html = await readFile(path.join(outDir, entry), 'utf8');
				for (const match of html.matchAll(/\/_img\/([\w.-]+\.webp)/g)) used.add(match[1]);
			}
			if (used.size === 0) return;
			await mkdir(path.join(outDir, '_img'), { recursive: true });
			await Promise.all([...used].map((name) => copyFile(path.join(cacheDir, name), path.join(outDir, '_img', name))));
		},
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
	integrations: [
		responsiveImages,
		sitemap({
			i18n: {
				defaultLocale: 'fr',
				locales: { fr: 'fr-FR', en: 'en-GB' },
			},
		}),
	],
});

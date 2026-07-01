// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.traveliles.com',
	output: 'static',
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

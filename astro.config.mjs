// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://cotenord.mu', // TODO: replace with production domain
	output: 'static',
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Jost',
			cssVariable: '--font-display',
			weights: ['300 700'],
			styles: ['normal'],
			subsets: ['latin', 'latin-ext'],
		},
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-body',
			weights: ['400', '500', '600'],
			styles: ['normal'],
			subsets: ['latin', 'latin-ext'],
		},
	],
});

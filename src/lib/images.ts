import { createHash } from 'node:crypto';
import { existsSync, mkdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Keep in sync with the copy step in astro.config.mjs.
const CACHE_DIR = path.resolve('node_modules/.astro/ti-img');
const PUBLIC_DIR = path.resolve('public');
const WIDTHS = [640, 1024, 1600];

export interface ResponsiveImage {
	src: string;
	srcset?: string;
}

const pending = new Map<string, Promise<ResponsiveImage>>();

/** WebP copies of a CMS upload at phone/tablet/desktop widths; falls back to the original untouched. */
export function responsiveImage(src: string): Promise<ResponsiveImage> {
	if (import.meta.env.DEV || !/^\/images\/.+\.(png|jpe?g|webp)$/i.test(src)) return Promise.resolve({ src });
	if (!pending.has(src)) pending.set(src, generate(src).catch(() => ({ src })));
	return pending.get(src)!;
}

async function generate(src: string): Promise<ResponsiveImage> {
	const file = path.join(PUBLIC_DIR, decodeURI(src));
	if (!existsSync(file)) return { src };

	const input = await readFile(file);
	const { width } = await sharp(input).metadata();
	if (!width) return { src };

	const hash = createHash('sha1').update(input).digest('hex').slice(0, 10);
	const slug = path
		.basename(file, path.extname(file))
		.normalize('NFD')
		.replace(/[^\w-]+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')
		.toLowerCase()
		.slice(0, 60);
	const widths = [...new Set([...WIDTHS.filter((w) => w < width), Math.min(width, WIDTHS.at(-1)!)])];

	mkdirSync(CACHE_DIR, { recursive: true });
	const variants = await Promise.all(
		widths.map(async (w) => {
			const name = `${slug}-${hash}-${w}.webp`;
			const out = path.join(CACHE_DIR, name);
			if (!existsSync(out)) {
				await sharp(input).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
			}
			return { url: `/_img/${name}`, w };
		}),
	);

	return {
		src: variants.at(-1)!.url,
		srcset: variants.map((v) => `${v.url} ${v.w}w`).join(', '),
	};
}

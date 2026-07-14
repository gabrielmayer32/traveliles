type IconDef = { s?: string[]; f?: string[] };

export const ICONS: Record<string, IconDef> = {
	search: { s: ['M11 11m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0', 'm21 21-4.3-4.3'] },
	menu: { s: ['M4 6h16', 'M4 12h16', 'M4 18h16'] },
	close: { s: ['M18 6 6 18', 'm6 6 12 12'] },
	'chevron-down': { s: ['m6 9 6 6 6-6'] },
	'chevron-right': { s: ['m9 18 6-6-6-6'] },
	'arrow-left': { s: ['M19 12H5', 'm12 19-7-7 7-7'] },
	'arrow-right': { s: ['M5 12h14', 'm12 5 7 7-7 7'] },
	'arrow-up-right': { s: ['M7 7h10v10', 'M7 17 17 7'] },
	mail: { s: ['M22 4H2v16h20z', 'm22 5-10 6L2 5'] },
	'map-pin': {
		s: [
			'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z',
			'M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
		],
	},
	instagram: {
		s: [
			'M2 7a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5z',
			'M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0',
			'M17.5 6.5h.01',
		],
	},
	facebook: { s: ['M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'] },
	youtube: {
		s: [
			'M22.5 6.4a2.8 2.8 0 0 0-1.9-2C18.9 4 12 4 12 4s-6.9 0-8.6.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 1.9 2C5.1 20 12 20 12 20s6.9 0 8.6-.4a2.8 2.8 0 0 0 1.9-2 29 29 0 0 0 .5-5.6 29 29 0 0 0-.5-5.6z',
		],
		f: ['M9.8 15V8.5L15.5 12z'],
	},
	play: { f: ['M7 4v16l13-8z'] },
};

export function iconSvg(
	name: string,
	size = 20,
	strokeWidth = 1.75,
): string {
	const def = ICONS[name] || ICONS.search;
	const strokes = (def.s || [])
		.map((d) => `<path d="${d}"/>`)
		.join('');
	const fills = (def.f || [])
		.map((d) => `<path d="${d}" fill="currentColor" stroke="none"/>`)
		.join('');
	return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:block;flex:none">${strokes}${fills}</svg>`;
}

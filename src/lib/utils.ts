export const CATEGORIES = [
	'Hôtellerie',
	'Gastronomie',
	'Immobilier de luxe',
	'Art de vivre',
	'Golf',
	'Écotourisme',
	'Culture',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_SLUG_MAP: Record<Category, string> = {
	Hôtellerie: 'hotellerie',
	Gastronomie: 'gastronomie',
	'Immobilier de luxe': 'immobilier-de-luxe',
	'Art de vivre': 'art-de-vivre',
	Golf: 'golf',
	Écotourisme: 'ecotourisme',
	Culture: 'culture',
};

export function slugifyCategory(category: Category | string) {
	return CATEGORY_SLUG_MAP[category as Category] ?? category
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export function categoryFromSlug(slug: string) {
	return CATEGORIES.find((category) => CATEGORY_SLUG_MAP[category] === slug);
}

export function formatDate(date: Date | string) {
	return new Intl.DateTimeFormat('fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date));
}

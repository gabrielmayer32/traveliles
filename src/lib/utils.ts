export const CATEGORIES = [
	'Rencontres',
	'Maurice demain',
	'Nos régions',
	'Nos Ambassadeurs',
	'Savoir-faire',
	"Mémoires d'îles",
	'Saveurs',
	'Activités & Evénements',
	'Nos adresses',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_SLUG_MAP: Record<Category, string> = {
	Rencontres: 'rencontres',
	'Maurice demain': 'maurice-demain',
	'Nos régions': 'nos-regions',
	'Nos Ambassadeurs': 'nos-ambassadeurs',
	'Savoir-faire': 'savoir-faire',
	"Mémoires d'îles": 'memoires-diles',
	Saveurs: 'saveurs',
	'Activités & Evénements': 'activites-et-evenements',
	'Nos adresses': 'nos-adresses',
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

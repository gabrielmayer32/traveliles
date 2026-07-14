export const CATEGORIES = [
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
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface RubriqueGroup {
	label: string;
	children?: Category[];
}

export const RUBRIQUES: RubriqueGroup[] = [
	{ label: 'Rencontres',              children: ['Nos Ambassadeurs'] },
	{ label: 'Nos régions' },
	{ label: 'Savoir-faire',            children: ['Héritage', 'Maurice demain'] },
	{ label: "Mémoires d'îles" },
	{ label: 'Saveurs' },
	{ label: 'Art & Culture' },
	{ label: 'Activités & Événements' },
	{ label: 'News' },
	{ label: 'Nos adresses' },
	{ label: 'Escapades' },
];

export const CATEGORY_SLUG_MAP: Record<Category, string> = {
	Rencontres: 'rencontres',
	'Nos Ambassadeurs': 'nos-ambassadeurs',
	'Nos régions': 'nos-regions',
	'Savoir-faire': 'savoir-faire',
	'Héritage': 'heritage',
	'Maurice demain': 'maurice-demain',
	"Mémoires d'îles": 'memoires-diles',
	Saveurs: 'saveurs',
	'Art & Culture': 'art-et-culture',
	'Activités & Événements': 'activites-et-evenements',
	News: 'news',
	'Nos adresses': 'nos-adresses',
	Escapades: 'escapades',
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

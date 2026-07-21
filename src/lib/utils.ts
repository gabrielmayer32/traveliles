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
	'Nos archives',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface RubriqueGroup {
	label: Category;
	children?: Category[];
}

export const RUBRIQUES: RubriqueGroup[] = [
	{ label: 'Rencontres' },
	{ label: 'Nos régions' },
	{ label: 'Savoir-faire' },
	{ label: 'Maurice demain' },
	{ label: 'Saveurs' },
	{ label: 'Art & Culture' },
	{ label: 'Activités & Événements' },
	{ label: 'Nos adresses' },
	{ label: 'Escapades' },
	{ label: 'Nos archives' },
];

export function getCategoryParent(category: Category): Category | undefined {
	return RUBRIQUES.find((group) => group.children?.includes(category))?.label;
}

export function getCategoryScope(category: Category): Category[] {
	const group = RUBRIQUES.find(({ label }) => label === category);
	return group?.children ? [category, ...group.children] : [category];
}

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
	'Nos archives': 'nos-archives',
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

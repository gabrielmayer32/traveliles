export const CATEGORIES = [
	'Un visage, une histoire',
	'Les gardiens du Savoir Faire',
	'24heures avec....',
	'Maurice demain',
	"Mémoires de l'Île",
	'Saveurs',
	'Nos régions',
	'Art & culture',
	'Activités & événements',
	'Nos Ambassadeurs régionaux',
	'Nos adresses',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_SLUG_MAP: Record<Category, string> = {
	'Un visage, une histoire': 'un-visage-une-histoire',
	'Les gardiens du Savoir Faire': 'les-gardiens-du-savoir-faire',
	'24heures avec....': '24heures-avec',
	'Maurice demain': 'maurice-demain',
	"Mémoires de l'Île": 'memoires-de-lile',
	Saveurs: 'saveurs',
	'Nos régions': 'nos-regions',
	'Art & culture': 'art-et-culture',
	'Activités & événements': 'activites-et-evenements',
	'Nos Ambassadeurs régionaux': 'nos-ambassadeurs-regionaux',
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

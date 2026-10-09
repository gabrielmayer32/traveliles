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

// Les dates saisies dans le CMS n'ont pas de fuseau : on les lit comme l'heure de Maurice (UTC+4),
// alors que le build Cloudflare tourne en UTC.
const MAURITIUS_OFFSET_MS = 4 * 60 * 60 * 1000;

// Publié = case « Publié » cochée ET date/heure atteinte (publication programmée).
export function isLive(entry: { data: { published: boolean; date: Date } }) {
	return entry.data.published && entry.data.date.getTime() - MAURITIUS_OFFSET_MS <= Date.now();
}

// Pub active = visible ET dans la fenêtre de contrat (dateStart..dateEnd).
export function isAdLive(entry: { data: { visible: boolean; dateStart?: Date; dateEnd?: Date } }) {
	if (!entry.data.visible) return false;
	const now = Date.now();
	if (entry.data.dateStart && entry.data.dateStart.getTime() - MAURITIUS_OFFSET_MS > now) return false;
	if (entry.data.dateEnd && entry.data.dateEnd.getTime() - MAURITIUS_OFFSET_MS < now) return false;
	return true;
}

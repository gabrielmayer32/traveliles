export type Locale = 'fr' | 'en';

export const defaultLocale: Locale = 'fr';

const translations = {
	// Navigation
	'nav.sections':       { fr: 'Rubriques',   en: 'Sections' },
	'nav.videos':         { fr: 'Vidéos',       en: 'Videos' },
	'nav.about':          { fr: 'À propos',     en: 'About' },
	'nav.search':         { fr: 'Recherche',    en: 'Search' },
	'nav.contact':        { fr: 'Contact',      en: 'Contact' },

	// Homepage
	'home.featured':      { fr: 'À la une · Vidéo',                    en: 'Featured · Video' },
	'home.tagline':       { fr: "Le magazine vidéo de l'océan Indien", en: 'The Indian Ocean video magazine' },
	'home.latest_videos': { fr: 'Dernières vidéos',                    en: 'Latest videos' },
	'home.all_videos':    { fr: 'Toutes les vidéos',                   en: 'All videos' },
	'home.reading':       { fr: 'En lecture',                          en: 'Now reading' },
	'home.to_read':       { fr: 'À lire',                              en: 'Latest articles' },
	'home.all_articles':  { fr: 'Tous les articles',                   en: 'All articles' },
	'home.videos_kicker': { fr: 'Vidéos',                              en: 'Videos' },
	'home.articles_kicker': { fr: 'Articles',                          en: 'Articles' },

	// Listings & detail
	'listing.back_articles': { fr: 'Tous les articles',  en: 'All articles' },
	'listing.back_videos':   { fr: 'Toutes les vidéos',  en: 'All videos' },
	'listing.section':       { fr: 'Rubrique',            en: 'Section' },
	'listing.topics':        { fr: 'Sujets',              en: 'Topics' },
	'listing.related':       { fr: 'À lire également',   en: 'Related articles' },
	'listing.more_videos':   { fr: 'À voir aussi',        en: 'More videos' },
	'listing.empty':         { fr: 'Aucun contenu dans cette rubrique pour le moment.', en: 'No content in this section yet.' },
	'listing.articles_title': { fr: 'Articles',           en: 'Articles' },
	'listing.videos_title':   { fr: 'Vidéos',             en: 'Videos' },

	// Search
	'search.title':       { fr: 'Chercher un sujet',                          en: 'Search' },
	'search.placeholder': { fr: 'Une adresse, un thème, une rubrique…',       en: 'A place, a theme, a section...' },
	'search.hint':        { fr: 'Essayez « rhum », « Grand Baie », « Saveurs »…', en: 'Try "rum", "Grand Baie", "Flavours"...' },
	'search.no_results':  { fr: 'Aucun résultat pour',                        en: 'No results for' },
	'search.results':     { fr: 'résultat',                                   en: 'result' },

	// Footer
	'footer.tagline':  { fr: 'Océan Indien',                en: 'Indian Ocean' },
	'footer.desc':     { fr: "Le magazine vidéo des îles de l'océan Indien : hospitalité, tables, régions et art de vivre mauricien.", en: 'The Indian Ocean islands video magazine: hospitality, dining, regions, and Mauritian art de vivre.' },
	'footer.sections': { fr: 'Rubriques',                   en: 'Sections' },
	'footer.magazine': { fr: 'Le magazine',                 en: 'The magazine' },
	'footer.rights':   { fr: 'Tous droits réservés.',       en: 'All rights reserved.' },
	'footer.legal':    { fr: 'Mentions légales',            en: 'Legal notice' },
	'footer.privacy':  { fr: 'Confidentialité',             en: 'Privacy' },
	'footer.videos':   { fr: 'Vidéos',                      en: 'Videos' },
	'footer.articles': { fr: 'Articles',                    en: 'Articles' },
	'footer.about':    { fr: 'À propos',                    en: 'About' },
	'footer.contact':  { fr: 'Contact',                     en: 'Contact' },
	'footer.search':   { fr: 'Recherche',                   en: 'Search' },

	// Cookies
	'cookies.text':   { fr: 'Ce site utilise des cookies tiers (YouTube, Vimeo) pour la lecture des vidéos.', en: 'This site uses third-party cookies (YouTube, Vimeo) for video playback.' },
	'cookies.accept': { fr: 'Accepter', en: 'Accept' },
	'cookies.refuse': { fr: 'Refuser',  en: 'Decline' },

	// 404
	'404.title': { fr: 'Page introuvable',                            en: 'Page not found' },
	'404.text':  { fr: "La page demandée n'existe pas ou a été déplacée.", en: 'The requested page does not exist or has been moved.' },
	'404.home':  { fr: "Retour à l'accueil",                         en: 'Back to homepage' },

	// Video embed
	'video.hosted_by':     { fr: 'Cette vidéo est hébergée par un service tiers',  en: 'This video is hosted by a third-party service' },
	'video.accept_cookies': { fr: 'Accepter les cookies et lire la vidéo',         en: 'Accept cookies and play video' },
	'video.watch_on':      { fr: 'Voir sur',                                        en: 'Watch on' },
	'video.kicker':        { fr: 'Vidéo',                                           en: 'Video' },
} as const;

export const CATEGORIES_EN: Record<string, string> = {
	'Un visage, une histoire':        'A Face, a Story',
	'Les gardiens du Savoir Faire':   'Guardians of Craftsmanship',
	'24heures avec....':              '24 Hours With...',
	'Maurice demain':                 'Mauritius Tomorrow',
	"Mémoires de l'Île":             'Island Memories',
	'Saveurs':                        'Flavours',
	'Nos régions':                    'Our Regions',
	'Art & culture':                  'Art & Culture',
	'Activités & événements':         'Activities & Events',
	'Nos Ambassadeurs régionaux':     'Our Regional Ambassadors',
	'Nos adresses':                   'Our Picks',
};

export function t(key: keyof typeof translations, locale: Locale): string {
	const entry = translations[key];
	if (!entry) return key;
	return entry[locale] ?? entry.fr;
}

export function localizedCategory(category: string, locale: Locale): string {
	if (locale === 'en') return CATEGORIES_EN[category] ?? category;
	return category;
}

export function getLocaleFromUrl(url: URL): Locale {
	const firstSegment = url.pathname.split('/')[1];
	return firstSegment === 'en' ? 'en' : 'fr';
}

export function localizedPath(path: string, locale: Locale): string {
	if (locale === 'fr') return path;
	return `/en${path}`;
}

export function formatDateLocale(date: Date | string, locale: Locale): string {
	return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date));
}

export const STATIC_ALTERNATES: Record<string, string> = {
	'/':                    '/en/',
	'/en/':                 '/',
	'/articles':            '/en/articles',
	'/en/articles':         '/articles',
	'/videos':              '/en/videos',
	'/en/videos':           '/videos',
	'/a-propos':            '/en/about',
	'/en/about':            '/a-propos',
	'/contact':             '/en/contact',
	'/en/contact':          '/contact',
	'/recherche':           '/en/search',
	'/en/search':           '/recherche',
	'/mentions-legales':    '/en/legal-notice',
	'/en/legal-notice':     '/mentions-legales',
	'/confidentialite':     '/en/privacy',
	'/en/privacy':          '/confidentialite',
};

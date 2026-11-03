import { isArchive, type Category } from './utils';
import { normalizeTags } from './tags';

// Mirrors the hand-written captions on the Travel-Îles Page: a one-line hook,
// one or two short story paragraphs, a 📖 call to action with the link, then hashtags.

const MAX_BODY_CHARS = 420;
const MAX_HASHTAGS = 8;

const CATEGORY_HASHTAGS: Partial<Record<Category, string[]>> = {
	Saveurs: ['CuisineMauricienne'],
	'Nos régions': ['DecouvrirMaurice'],
	'Art & Culture': ['CultureMauricienne'],
	'Savoir-faire': ['SavoirFaire'],
	Rencontres: ['Portrait'],
	'Maurice demain': ['Environnement'],
	'Nos archives': ['PatrimoineMauricien', 'HistoireDeMaurice'],
};

// Archive reprints carry noisy WordPress tags, so their hashtags come from places named in the text
const PLACES = [
	'Port-Louis', 'Rodrigues', 'Chamarel', 'Mahébourg', 'Curepipe', 'Grand-Baie', 'Le Morne', 'Tamarin',
	'Flic-en-Flac', 'Trou-aux-Biches', 'Belle Mare', 'Bel Ombre', 'Souillac', 'Grand-Port', 'Albion',
	'Pamplemousses', 'Moka', 'Quatre-Bornes', 'Rose-Hill', 'Vacoas', 'Black River', 'Rivière Noire',
	'Chagos', 'Agaléga', 'Saint-Brandon', 'La Réunion', 'Seychelles', 'Madagascar', 'Mayotte',
];

interface CaptionArticle {
	body?: string;
	data: { title: string; excerpt: string; category: Category; tags?: string[] };
}

function plainParagraphs(markdown = '') {
	return markdown
		.split(/\n\s*\n/)
		.map((p) => p.trim())
		.filter((p) => p && !/^(#|!\[|\*\*[^*]+\*\*$|[-*] |\*Publié pour la première fois)/.test(p))
		.map((p) =>
			p
				.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
				.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
				.replace(/[*_]/g, '')
				.replace(/\s+/g, ' ')
				.trim(),
		)
		.filter((p) => p.length >= 60);
}

function sentences(text: string) {
	return text.split(/(?<=[.!?…»])\s+(?=[A-ZÀ-ÝÉÈ«"“])/).map((s) => s.trim()).filter(Boolean);
}

function hashtag(text: string) {
	const words = text
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^A-Za-z0-9 ]+/g, ' ')
		.split(/\s+/)
		.filter(Boolean);
	if (!words.length || words.length > 3) return null;
	const tag = words.map((w) => w[0].toUpperCase() + w.slice(1)).join('');
	return tag.length <= 25 ? tag : null;
}

export function facebookCaption(article: CaptionArticle, url: string) {
	const archive = isArchive(article);
	const paras = plainParagraphs(article.body);
	// A hand-written excerpt makes the best lead; a truncated one ("…") does not
	const excerpt = article.data.excerpt?.trim();
	const lead = sentences(excerpt && !excerpt.endsWith('…') ? excerpt : paras[0] || '');

	// Hook: the lead's first sentence when it is punchy, otherwise the title
	const hook = lead[0] && lead[0].length <= 160 ? lead[0] : article.data.title;
	const rest = lead[0] === hook ? lead.slice(1) : lead;
	const pool = [...rest, ...paras.slice(1).flatMap(sentences)];

	const body: string[] = [];
	let length = 0;
	for (const sentence of pool) {
		if (length + sentence.length > MAX_BODY_CHARS && body.length) break;
		body.push(sentence);
		length += sentence.length;
	}
	// Two short paragraphs read better than one block
	const split = Math.ceil(body.length / 2);
	const paragraphs = body.length > 2 ? [body.slice(0, split), body.slice(split)] : [body];

	const cta = archive
		? `📖 Redécouvrez cet article des archives Côte Nord sur Travel-Îles :\n${url}`
		: `📖 Retrouvez l’article sur Travel-Îles :\n${url}`;

	const text = `${article.data.title} ${paras.join(' ')}`;
	const topicTags = archive
		? PLACES.filter((place) => text.includes(place)).slice(0, 3)
		: normalizeTags(article.data.tags).slice(0, 5);
	const tags = [
		'TravelIles',
		...topicTags.map(hashtag),
		...(CATEGORY_HASHTAGS[article.data.category] ?? []),
		'IleMaurice',
		...(archive ? ['ArchivesCoteNord'] : []),
	].filter((t): t is string => !!t);
	const seen = new Set<string>();
	const hashtags = tags
		.filter((t) => !seen.has(t.toLowerCase()) && seen.add(t.toLowerCase()))
		.slice(0, MAX_HASHTAGS)
		.map((t) => `#${t}`);

	return [hook, ...paragraphs.map((p) => p.join(' ')).filter(Boolean), cta, hashtags.join(' ')].join('\n\n');
}

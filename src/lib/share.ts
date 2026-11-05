import type { Locale } from './i18n';

export type ShareTarget = {
	id: string;
	label: string;
	icon: string;
	href: string;
	popup: boolean;
};

export const SHARE_LABELS = {
	fr: {
		share: 'Partager',
		copy: 'Copier le lien',
		copied: 'Lien copié',
		email: 'E-mail',
		shareOn: 'Partager sur',
		featureTitle: 'Cette histoire vous a plu ?',
		featureText: 'Partagez-la avec ceux qui rêvent de Maurice.',
		emailBody: 'Je pense que ceci va te plaire :',
	},
	en: {
		share: 'Share',
		copy: 'Copy link',
		copied: 'Link copied',
		email: 'Email',
		shareOn: 'Share on',
		featureTitle: 'Enjoyed this story?',
		featureText: 'Share it with someone who dreams of Mauritius.',
		emailBody: 'I thought you would enjoy this:',
	},
} as const;

export function getShareTargets(url: string, title: string, locale: Locale, image?: string): ShareTarget[] {
	const u = encodeURIComponent(url);
	const t = encodeURIComponent(title);
	const l = SHARE_LABELS[locale];
	return [
		{ id: 'facebook', label: 'Facebook', icon: 'brand-facebook', popup: true, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
		{ id: 'whatsapp', label: 'WhatsApp', icon: 'brand-whatsapp', popup: false, href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
		{
			id: 'pinterest',
			label: 'Pinterest',
			icon: 'brand-pinterest',
			popup: true,
			href: `https://www.pinterest.com/pin/create/button/?url=${u}&description=${t}${image ? `&media=${encodeURIComponent(image)}` : ''}`,
		},
		{ id: 'linkedin', label: 'LinkedIn', icon: 'brand-linkedin', popup: true, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
		{ id: 'x', label: 'X', icon: 'brand-x', popup: true, href: `https://x.com/intent/post?url=${u}&text=${t}` },
		{
			id: 'email',
			label: l.email,
			icon: 'mail',
			popup: false,
			href: `mailto:?subject=${t}&body=${encodeURIComponent(`${l.emailBody}\n\n${title}\n${url}`)}`,
		},
	];
}

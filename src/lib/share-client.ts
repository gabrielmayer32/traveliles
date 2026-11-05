function shareData(el: HTMLElement) {
	const root = el.closest<HTMLElement>('[data-share-url]');
	return {
		url: root?.dataset.shareUrl || window.location.href,
		title: root?.dataset.shareTitle || document.title,
	};
}

async function copyText(text: string) {
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		const input = document.createElement('textarea');
		input.value = text;
		input.setAttribute('readonly', '');
		input.style.position = 'fixed';
		input.style.opacity = '0';
		document.body.appendChild(input);
		input.select();
		document.execCommand('copy');
		input.remove();
	}
}

function openPopup(href: string) {
	const w = 620;
	const h = 640;
	const left = window.screenX + (window.outerWidth - w) / 2;
	const top = window.screenY + (window.outerHeight - h) / 2;
	// "noopener" in the features string makes window.open return null, so detach the opener manually
	const win = window.open(href, 'share', `width=${w},height=${h},left=${left},top=${top}`);
	if (win) win.opener = null;
	return win;
}

function initFloat() {
	const float = document.querySelector<HTMLElement>('[data-share-float]');
	const start = document.querySelector<HTMLElement>('[data-share-start]');
	if (!float || !start) return;
	const ends = document.querySelectorAll<HTMLElement>('[data-share-end], footer');
	let pastStart = false;
	const endsVisible = new Set<Element>();
	const update = () => float.toggleAttribute('data-visible', pastStart && endsVisible.size === 0);

	new IntersectionObserver(([entry]) => {
		pastStart = !entry.isIntersecting && entry.boundingClientRect.top < 0;
		update();
	}).observe(start);

	const endObserver = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) endsVisible.add(entry.target);
			else endsVisible.delete(entry.target);
		}
		update();
	});
	ends.forEach((el) => endObserver.observe(el));
}

export function initShare() {
	if ((window as any).__shareReady) return;
	(window as any).__shareReady = true;

	const canNative = typeof navigator.share === 'function';
	document.querySelectorAll<HTMLElement>('[data-share-native]').forEach((el) => {
		el.hidden = !canNative;
	});

	document.addEventListener('click', async (event) => {
		const el = (event.target as Element).closest<HTMLElement>('[data-share-popup], [data-share-copy], [data-share-native], [data-share-trigger]');
		if (!el) return;

		if (el.hasAttribute('data-share-popup')) {
			if (openPopup((el as HTMLAnchorElement).href)) event.preventDefault();
			return;
		}

		const { url, title } = shareData(el);

		if (el.hasAttribute('data-share-copy')) {
			await copyText(url);
			el.setAttribute('data-copied', '');
			const status = el.querySelector('[data-share-status]');
			if (status) status.textContent = el.dataset.copiedLabel || '';
			window.setTimeout(() => {
				el.removeAttribute('data-copied');
				if (status) status.textContent = '';
			}, 2200);
			return;
		}

		if (canNative) {
			try {
				await navigator.share({ title, url });
			} catch {
				// user dismissed the share sheet
			}
			return;
		}

		document.querySelector('[data-share-end]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	});

	initFloat();
}

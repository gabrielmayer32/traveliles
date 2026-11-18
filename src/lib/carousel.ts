export function setupCarousels() {
	document.querySelectorAll<HTMLElement>('.carousel-section').forEach((section) => {
		const scroller = section.querySelector<HTMLElement>('.carousel-track-wrapper');
		const [prev, next] = section.querySelectorAll<HTMLButtonElement>('.carousel-arrow');
		const slide = section.querySelector<HTMLElement>('.carousel-slide');
		if (!scroller || !prev || !next || !slide || scroller.dataset.carouselReady) return;
		scroller.dataset.carouselReady = 'true';

		const step = () => slide.offsetWidth + (parseFloat(getComputedStyle(slide.parentElement!).gap) || 0);
		const update = () => {
			prev.disabled = scroller.scrollLeft <= 1;
			next.disabled = scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth - 1;
		};

		prev.addEventListener('click', () => scroller.scrollBy({ left: -step(), behavior: 'smooth' }));
		next.addEventListener('click', () => scroller.scrollBy({ left: step(), behavior: 'smooth' }));
		scroller.addEventListener('scroll', update, { passive: true });
		new ResizeObserver(update).observe(scroller);
		update();
	});
}

export function getYouTubeVideoId(value?: string): string | undefined {
	const input = value?.trim();
	if (!input) return undefined;

	const plainId = input.match(/^([A-Za-z0-9_-]{11})(?:[?&].*)?$/);
	if (plainId) return plainId[1];

	try {
		const url = new URL(
			/^https?:\/\//i.test(input) ? input : `https://${input}`,
		);
		const hostname = url.hostname.replace(/^www\./, '');

		if (hostname === 'youtu.be') {
			return url.pathname.split('/').filter(Boolean)[0];
		}

		if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
			const queryId = url.searchParams.get('v');
			if (queryId) return queryId;

			const segments = url.pathname.split('/').filter(Boolean);
			if (['embed', 'shorts', 'live'].includes(segments[0])) {
				return segments[1];
			}
		}
	} catch {
		// Keep the original value below so existing non-URL IDs remain compatible.
	}

	return input.split(/[?&]/)[0];
}

export function getVideoThumbnail(
	videoSource: string,
	videoId?: string,
	customThumbnail?: string,
): string | undefined {
	if (customThumbnail?.trim()) return customThumbnail;
	if (videoSource !== 'youtube') return undefined;

	const youtubeId = getYouTubeVideoId(videoId);
	return youtubeId
		? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
		: undefined;
}

export function getYouTubeThumbnailFallback(videoId?: string): string | undefined {
	const youtubeId = getYouTubeVideoId(videoId);
	return youtubeId
		? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
		: undefined;
}

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
		? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
		: undefined;
}

export function getVideoSchemaUrls(
	videoSource: string,
	videoId?: string,
	videoFile?: string,
): { embedUrl?: string; contentUrl?: string } {
	if (videoSource === 'r2') return videoFile ? { contentUrl: videoFile } : {};
	if (!videoId) return {};
	const id = videoSource === 'youtube' ? getYouTubeVideoId(videoId) : videoId;
	switch (videoSource) {
		case 'youtube':
			return { embedUrl: `https://www.youtube.com/embed/${id}` };
		case 'vimeo':
			return { embedUrl: `https://player.vimeo.com/video/${id}` };
		case 'facebook':
			return { embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(id ?? '')}` };
		case 'instagram':
			return { embedUrl: `https://www.instagram.com/reel/${id}/embed/` };
		default:
			return {};
	}
}

export function getYouTubeThumbnailFallback(videoId?: string): string | undefined {
	const youtubeId = getYouTubeVideoId(videoId);
	return youtubeId
		? `https://i.ytimg.com/vi/${youtubeId}/mqdefault.jpg`
		: undefined;
}

export function normalizeTags(tags: string[] = []): string[] {
	const seen = new Set<string>();

	return tags
		.flatMap((tag) => tag.split(/[,;\n]+/))
		.map((tag) => tag.trim().replace(/[.]+$/, ''))
		.filter((tag) => {
			if (!tag) return false;
			const key = tag.toLocaleLowerCase();
			if (seen.has(key)) return false;
			seen.add(key);
			return true;
		});
}

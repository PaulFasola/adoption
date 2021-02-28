export const shortenHash = (hash: string, length: number): string => {
	if (hash.length <= 2 * length) {
		return hash;
	}

	return `${hash.substr(0, length)}...${hash.substr(hash.length - length, hash.length - 1)}`;
}
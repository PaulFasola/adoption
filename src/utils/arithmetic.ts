export const padDigits = (number: number, digits: number, max = 30): string => {
	let s = number.toString();
	if (number === 0) {
		s = `0.${s}`
	}
	while (s.length < digits && s.length < max) s += '0';
	return s;
}
import { shortenHash } from "../string";

describe(`String - shortenHash`, () => {
	it('should render a basic, unshortened hash', () => {
		const hash = "0x00000000000000000000000";
		const shortHash = shortenHash(hash, hash.length + 1);
		expect(shortHash).toEqual(hash);
	});

	it('should render a shortened hash, 4 charaters on each side', () => {
		const hash = "0x123456789ABCDEFGHIJKLM";
		const shortHash = shortenHash(hash, 4);
		expect(shortHash).toEqual('0x12...JKLM');
	});
});
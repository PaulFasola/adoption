import { padDigits } from "../arithmetic";

describe(`Arithmetic - PadDigits`, () => {
	it('should return 0.0 when number = 0', () => {
		const num = padDigits(0, 0);
		expect(num).toEqual('0.0');
	});

	it('should return the appropriate padding when number = x (> 0)', () => {
		let num = padDigits(1, 1);
		expect(num).toEqual('1');

		num = padDigits(1, 10);
		expect(num).toEqual('1000000000');

		num = padDigits(0.5, 10);
		expect(num).toEqual('0.50000000');

		num = padDigits(0.0045, 8);
		expect(num).toEqual('0.004500');

		num = padDigits(4242.4141, 2);
		expect(num).toEqual('4242.4141');

		num = padDigits(4242.4141, 3);
		expect(num).toEqual('4242.4141');
	});

	it('should respect "max" parameter when specified', () => {
		let num = padDigits(100.50, 3, 1);
		expect(num).toEqual('100.5');

		num = padDigits(100.50, 12, 10);
		expect(num).toEqual('100.500000');
	});
});
export default function isHexadecimal24(text) {
	const hexaTest = /^[A-F0-9]+$/i.test(text);
	const lengthTest = text.length === 24;
	return hexaTest && lengthTest;
}

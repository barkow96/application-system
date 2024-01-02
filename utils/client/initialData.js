export const initialAuthData = {
	email: { value: "", isValid: false, message: "", isTouched: false },
	password1: { value: "", isValid: false, message: "", isTouched: false },
	password2: { value: "", isValid: false, message: "", isTouched: false },
};

export const exampleAuthData = {
	email: { value: "bartosz@gmail.com", isValid: true, message: "", isTouched: false },
	password1: { value: "bartosz1", isValid: true, message: "", isTouched: true },
	password2: { value: "bartosz1", isValid: true, message: "", isTouched: true },
};

export const initialApplicationData = {
	names: { value: "", isValid: false, message: "", isTouched: false, comment: "" },
	surrname: { value: "", isValid: false, message: "", isTouched: false, comment: "" },
	title: { value: "", isValid: false, message: "", isTouched: false, comment: "" },
	familyName: { value: "", isValid: false, message: "", isTouched: false, comment: "" },
	dateOfBirth: { value: "", isValid: false, message: "", isTouched: false, comment: "" },
	placeOfBirth: { value: "", isValid: false, message: "", isTouched: false, comment: "" },
	pesel: { value: "", isValid: false, message: "", isTouched: false, comment: "" },
	nationality: { value: "", isValid: false, message: "", isTouched: false, comment: "" },
	address: { value: "", isValid: false, message: "", isTouched: false, comment: "" },
	correspondenceAddress: { value: "", isValid: false, message: "", isTouched: false, comment: "" },
	email: { value: "", isValid: false, message: "", isTouched: false, comment: "" },
	phone: { value: "", isValid: false, message: "", isTouched: false, comment: "" },
	education: { value: "", isValid: false, message: "", isTouched: false, comment: "" },
	educationInPoland: { value: false, isValid: true, message: "", isTouched: false, comment: "" },
	contactPerson: { value: "", isValid: false, message: "", isTouched: false, comment: "" },
};

export const exampleApplicationData = {
	names: { value: "Jan", isValid: true, message: "", isTouched: true },
	surrname: { value: "Programistyczny", isValid: true, message: "", isTouched: true },
	title: { value: "NextJS Developer", isValid: true, message: "", isTouched: true },
	familyName: { value: "Programistyczny", isValid: true, message: "", isTouched: true },
	dateOfBirth: { value: "1999-12-31", isValid: true, message: "", isTouched: true },
	placeOfBirth: { value: "Programów", isValid: true, message: "", isTouched: true },
	pesel: { value: "99123100333", isValid: true, message: "", isTouched: true },
	nationality: { value: "polskie", isValid: true, message: "", isTouched: true },
	address: { value: "30-000 Programów, ul. Oknowa 95/98", isValid: true, message: "", isTouched: true },
	correspondenceAddress: { value: "30-000 Programów, ul. Oknowa 95/98", isValid: true, message: "", isTouched: true },
	email: { value: "jan@gmail.com", isValid: true, message: "", isTouched: true },
	phone: { value: "500-600-700", isValid: true, message: "", isTouched: true },
	education: { value: "wyższe", isValid: true, message: "", isTouched: true },
	educationInPoland: { value: true, isValid: true, message: "", isTouched: true },
	contactPerson: { value: "Bartosz Kowal", isValid: true, message: "", isTouched: true },
};

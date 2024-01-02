const emptyMessage = "Pole nie może pozostać puste.";

export const checkIfLettersOnly = (text) => {
	const test = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s]*$/.test(text) && text.length > 0;
	let message = test ? "" : "Pole może zawierać tylko litery.";
	message = text.trim().length === 0 ? emptyMessage : message;
	return { test, message };
};

export const checkIfPeselCorrect = (text) => {
	const test = /^\d+$/ && text.length === 11;
	let message = test ? "" : "PESEL musi składać się z 11 cyfr.";
	message = text.trim().length === 0 ? emptyMessage : message;
	return { test, message };
};

export const checkIfEmailCorrect = (text) => {
	const test = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(text);
	let message = test ? "" : "Nieprawidłowy adres email.";
	message = text.trim().length === 0 ? emptyMessage : message;
	return { test, message };
};

export const checkIfHas18Years = (text) => {
	const birthday = new Date(text);
	const today = new Date();

	const diff = today - birthday;
	const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

	const test = age >= 18;
	let message = test ? "" : "Nie masz ukończonych 18 lat.";
	message = text.trim().length === 0 ? emptyMessage : message;
	return { test, message };
};

export const checkIfPhoneNumberCorrect = (text) => {
	const test = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(text);
	let message = test ? "" : "Nieprawidłowy numer telefonu.";
	message = text.trim().length === 0 ? emptyMessage : message;
	return { test, message };
};

export const checkIfAddressCorrect = (text) => {
	const test = text.trim().length > 0;
	let message = test ? "" : "Adres jest pusty.";
	message = text.trim().length === 0 ? emptyMessage : message;
	return { test, message };
};

export const checkIfPasswordCorrect = (text) => {
	const test = text.trim().length >= 6;
	let message = test ? "" : "Zbyt krótkie hasło.";
	message = text.trim().length === 0 ? emptyMessage : message;
	return { test, message };
};

export const checkIfPasswordsMatch = (text1, text2) => {
	const test = text1.trim() === text2.trim();
	let message = test ? "" : "Hasła nie są takie same.";
	message = text1.trim().length === 0 || text2.trim().length === 0 ? emptyMessage : message;
	return { test, message };
};

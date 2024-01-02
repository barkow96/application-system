export const dictionary = {
	names: "1. Imię (imiona)",
	surrname: "2. Nazwisko",
	title: "3. Tytuł zawodowy",
	familyName: "4. Nazwisko rodowe",
	dateOfBirth: "5. Data urodzenia",
	placeOfBirth: "6. Miejsce urodzenia",
	pesel: "7. PESEL",
	nationality: "8. Obywatelstwo",
	address: "9. Adres zamieszkania",
	correspondenceAddress: "10. Adres korespondencyjny",
	email: "11. Adres e-mail",
	phone: "12. Telefon",
	education: "13. Wykształcenie",
	educationInPoland: "14. Polskie świadectwo dojrzałości",
	contactPerson: "15. Kontakt w razie wypadku",
};

export const timeStampToDate = (timeStamp) => {
	if (!timeStamp) return null;
	const dateObj = new Date(timeStamp);
	const year = dateObj.getFullYear();
	let month = dateObj.getMonth() + 1;
	if (month <= 9) month = `0${month}`;
	let day = dateObj.getDate();
	if (day <= 9) day = `0${day}`;
	let hours = dateObj.getHours();
	if (hours <= 9) hours = `0${hours}`;
	let minutes = dateObj.getMinutes();
	if (minutes <= 9) minutes = `0${minutes}`;

	return `${year}/${month}/${day} godz. ${hours}:${minutes}`;
};

export const fulfillApplicationForm = (formData, application) => {
	for (const key in application) {
		if (key === "_id" || key === "metaData" || key === "feedback") continue;

		formData[key].value = application[key];
		formData[key].isValid = true;
		formData[key].isTouched = true;
		formData[key].message = "";
		if (application.feedback.comments) formData[key].comment = application.feedback.comments[key];
	}
};

export const postData = async (url, body) => {
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	const data = await response.json();

	return { response, data };
};

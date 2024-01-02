import {
	checkIfAddressCorrect,
	checkIfEmailCorrect,
	checkIfHas18Years,
	checkIfLettersOnly,
	checkIfPasswordCorrect,
	checkIfPasswordsMatch,
	checkIfPeselCorrect,
	checkIfPhoneNumberCorrect,
} from "./validateInput";

export default function validateApplication(propertyName, propertyValue1, propertyValue2) {
	let validation;

	if (
		propertyName === "names" ||
		propertyName === "surrname" ||
		propertyName === "title" ||
		propertyName === "familyName" ||
		propertyName === "placeOfBirth" ||
		propertyName === "contactPerson" ||
		propertyName === "nationality" ||
		propertyName === "education"
	)
		validation = checkIfLettersOnly(propertyValue1);
	else if (propertyName === "pesel") validation = checkIfPeselCorrect(propertyValue1);
	else if (propertyName === "email") validation = checkIfEmailCorrect(propertyValue1);
	else if (propertyName === "dateOfBirth") validation = checkIfHas18Years(propertyValue1);
	else if (propertyName === "phone") validation = checkIfPhoneNumberCorrect(propertyValue1);
	else if (propertyName === "address" || propertyName === "correspondenceAddress") validation = checkIfAddressCorrect(propertyValue1);
	else if (propertyName === "password1") validation = checkIfPasswordCorrect(propertyValue1);
	else if (propertyName === "password2") validation = checkIfPasswordsMatch(propertyValue1, propertyValue2);
	else if (propertyName === "educationInPoland") validation = { test: true, message: "" };

	return validation;
}

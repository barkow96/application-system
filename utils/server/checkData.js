import { dictionary as requiredFields } from "../misc/utils";
import validateApplication from "../validation/validateApplication";

export function checkData(data) {
	let isCorrect = true;
	let resMessage = "";

	//CHECK IF REQUEST CONTAINS OBJECT
	if (typeof data !== "object" || Array.isArray(data)) {
		resMessage = "Nieprawidłowy typ danych!";
		isCorrect = false;
	}

	//CHECK IF OBJECT CONTAINS ALL NECESSARY FIELDS
	for (const field in requiredFields) {
		if (!data.hasOwnProperty(field)) {
			resMessage = "Niekompletne dane!";
			isCorrect = false;
		}
	}

	//CHECK IF NECESSARY FIELDS ARE VALID
	for (const field in requiredFields) {
		if (validateApplication(field, data[field]).test === false) {
			resMessage = "Wprowadzone dane są nieprawidłowe!";
			isCorrect = false;
		}
	}

	return { isCorrect, resMessage };
}

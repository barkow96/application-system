import validateApplication from "../validation/validateApplication";

export default function formDataReducer(state, action) {
	const selectedProperty = action.type.property;
	const selectedAction = action.type.task;

	switch (selectedAction) {
		case "CHANGE":
			const newValue = selectedProperty === "educationInPoland" ? !state[selectedProperty].value : action.payload;
			return {
				...state,
				[selectedProperty]: {
					value: newValue,
					isValid: state[selectedProperty].isValid,
					message: state[selectedProperty].message,
					isTouched: state[selectedProperty].isTouched,
					comment: state[selectedProperty].comment,
				},
			};
		case "BLUR":
			const checkedValue = state[selectedProperty].value;
			let validation = { test: false, message: "" };
			if (selectedProperty === "password2") validation = validateApplication(selectedProperty, state.password1.value, state.password2.value);
			else validation = validateApplication(selectedProperty, checkedValue);

			const { test: isValid, message: validationMessage } = validation;

			return {
				...state,
				[selectedProperty]: {
					value: checkedValue,
					isValid: isValid,
					message: validationMessage,
					isTouched: true,
					comment: state[selectedProperty].comment,
				},
			};
		case "COMMENT":
			return {
				...state,
				[selectedProperty]: {
					value: state[selectedProperty].value,
					isValid: state[selectedProperty].isValid,
					message: state[selectedProperty].message,
					isTouched: state[selectedProperty].isTouched,
					comment: action.payload,
				},
			};
		default:
			return state;
	}
}

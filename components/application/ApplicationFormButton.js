import classes from "../UI/Button.module.scss";

export default function ApplicationFormButton({ buttonDisplayLogic, onClick, formIsValid }) {
	const { isAdmin, userIsCheckingStatus, status, canceled } = buttonDisplayLogic;
	if (canceled) return null;

	const cancelButton = !isAdmin && userIsCheckingStatus && status === "REJECTED";
	const modifyButton = !isAdmin && userIsCheckingStatus && status === "VERIFY";
	const applyButton = !isAdmin && !userIsCheckingStatus;
	const verifyButton = isAdmin;
	if (!cancelButton && !modifyButton && !applyButton && !verifyButton) return null;

	let action, text;
	let disabled = !formIsValid;

	if (cancelButton) {
		disabled = false;
		action = "CANCEL";
		text = "Zatwierdź odrzucenie";
	} else if (modifyButton) {
		action = "UPDATE";
		text = "Zaktualizuj aplikację";
	} else if (applyButton) {
		action = "APPLY";
		text = "Aplikuj";
	} else if (verifyButton) {
		action = "VERIFY";
		text = "Rozpatrz aplikację";
	}

	return (
		<button
			type="button"
			className={classes.button}
			style={{ margin: "auto" }}
			onClick={(event) => {
				onClick(event, action);
			}}
			disabled={disabled}
		>
			{text}
		</button>
	);
}

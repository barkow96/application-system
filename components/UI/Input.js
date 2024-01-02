import classes from "./Input.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Input({ children, type, name, property, dispatch, feedback, isAdmin, userIsCheckingStatus, status, styles, canceled, tab }) {
	const [isEditable, setIsEditable] = useState(false);
	const [isCommentable, setIsCommentable] = useState(false);
	const displayEditIcon = (isAdmin && !canceled) || (userIsCheckingStatus && status === "VERIFY");
	const displayCommentIcon = isAdmin && !canceled;
	const displayAdminComment = (userIsCheckingStatus && feedback) || (isAdmin && isCommentable);

	function handleChangeValue(event) {
		dispatch({ type: { property: name, task: "CHANGE" }, payload: event.target.value });
	}

	function handleBlurValue() {
		dispatch({ type: { property: name, task: "BLUR" } });
	}

	function handleComment(event) {
		dispatch({ type: { property: name, task: "COMMENT" }, payload: event.target.value });
	}

	const inputAttributes = {
		type: type,
		id: name,
		onChange: handleChangeValue,
		tabIndex: tab !== null ? tab : isEditable ? 0 : -1,
		style: styles ? styles : {},
		className: (isAdmin || userIsCheckingStatus) && !isEditable ? classes["not-clickable"] : "",
	};
	if (type === "checkbox") inputAttributes.checked = property.value;
	else {
		inputAttributes.value = property.value;
		inputAttributes.onBlur = handleBlurValue;
	}

	const adminCommentInput = (
		<input
			type="text"
			id={`${name}Comment`}
			value={property.comment}
			onChange={handleComment}
			placeholder="Wprowadź komentarz"
			className={classes["comment-box"]}
		/>
	);

	return (
		<div className={classes.input}>
			<label htmlFor={name}>{children}</label>
			<input {...inputAttributes} />

			{displayEditIcon && (
				<FontAwesomeIcon
					icon={faEdit}
					className={`${classes.icon} ${isEditable ? classes.green : ""}`}
					onClick={() => {
						setIsEditable((prevState) => !prevState);
					}}
				/>
			)}
			{displayCommentIcon && (
				<FontAwesomeIcon
					icon={faComment}
					className={`${classes.icon} ${isCommentable ? classes.green : ""}`}
					onClick={() => {
						setIsCommentable((prevState) => !prevState);
					}}
				/>
			)}

			{!property.isValid && <p className={classes["invalid-text"]}>{property.message}</p>}

			{displayAdminComment && (
				<p>
					<span className={classes["comment-text"]}>Komentarz administratora:</span> {feedback || adminCommentInput}
				</p>
			)}
		</div>
	);
}

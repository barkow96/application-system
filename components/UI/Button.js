import classes from "./Button.module.scss";
import { useRouter } from "next/router";

export default function Button({ children, path = null, onClickHandler = null, isActive = true, styles = {} }) {
	const router = useRouter();

	function handleClick(event) {
		if (path) router.replace(path);
		else if (onClickHandler) onClickHandler(event);
	}

	const properties = {
		type: "button",
		className: classes.button,
		style: styles,
		disabled: !isActive,
		onClick: (event) => {
			handleClick(event);
		},
	};

	return <button {...properties}>{children}</button>;
}

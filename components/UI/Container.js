import classes from "./Container.module.scss";

export default function Container({ children, styles }) {
	return (
		<div className={classes.container} style={styles ? styles : {}}>
			{children}
		</div>
	);
}

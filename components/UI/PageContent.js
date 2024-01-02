import classes from "./PageContent.module.scss";

export default function PageContent({ title, children }) {
	return (
		<main className={classes.content}>
			<h1>{title}</h1>
			{children}
		</main>
	);
}

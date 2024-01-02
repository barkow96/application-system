import classes from "./Navigation.module.scss";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function MainNavigaion() {
	const { data: session } = useSession();
	const isStudent = session && session.user.role === "student";
	const hasApplied = isStudent && session.user.applicationId;
	const isAdmin = session && session.user.role === "admin";

	let statusLink = `/status`;
	if (session) statusLink += `/${session.user.role}`;
	if (isStudent) statusLink += `/${session.user.applicationId}`;

	async function logoutHandler() {
		signOut({ callbackUrl: "/" });
	}

	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<Image src="/img/AGH-logo.jpg" alt="Logo AGH" width={100} height={100} />
			</div>
			<nav className={classes.nav}>
				<ul className={classes.list}>
					<li>
						<Link href="/">Home</Link>
					</li>

					{(isStudent || isAdmin) && (
						<li>
							<Link href="/account">Konto</Link>
						</li>
					)}

					{isStudent && !hasApplied && (
						<li>
							<Link href="/application">Aplikuj</Link>
						</li>
					)}

					{(isStudent || isAdmin) && (
						<li>
							<Link href={statusLink}>Status aplikacji</Link>
						</li>
					)}

					{!isStudent && !isAdmin && (
						<li>
							<Link href="/auth">Zaloguj się</Link>
						</li>
					)}

					{(isStudent || isAdmin) && (
						<li>
							<button className={classes["logout-button"]} onClick={logoutHandler}>
								Wyloguj się
							</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}

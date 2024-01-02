import classes from "./StudentItem.module.scss";
import Link from "next/link";

export default function StudentItem({ id, index, names, surrname, pesel, date, status, labGroup, canceled }) {
	const className = canceled ? classes["canceled"] : "";

	return (
		<li key={id} className={classes["list-item"]}>
			<div className={classes["list-data"]}>
				<Link href={`admin/${id}`} className={className}>
					<div>{index}|</div>
					<div className={classes["data"]}>
						{names} {surrname}
					</div>
					<div className={classes["data"]}>{pesel}</div>
					<div className={classes["data"]}>{date}</div>
				</Link>
			</div>
			<div className={classes["list-status"]}>
				<div className={classes["status"]}>
					Status aplikacji: <b>{status}</b>
				</div>
				<div className={classes["action"]}>
					<div className={classes["status"]}>
						Grupa laboratoryjna: <b>{labGroup}</b>
					</div>
				</div>
			</div>
			<div className="underline"></div>
		</li>
	);
}

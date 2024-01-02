import listClasses from "./StudentList.module.scss";
import itemClasses from "./StudentItem.module.scss";
import StudentItem from "./StudentItem";
import { timeStampToDate } from "@/utils/misc/utils";
import { Fragment, useState } from "react";

export default function StudentList({ applications, filter }) {
	let appCounter = 0;

	const filteredStudentItems = applications.map((application) => {
		const date = timeStampToDate(application.metaData.timeStamp);
		const status = application.feedback.status;
		const labGroup = application.feedback.labGroup;

		let categoryCondition;
		if (filter.category === "current") categoryCondition = application.metaData.latest;
		else if (filter.category === "archival") categoryCondition = application.metaData.canceled;
		else if (filter.category === "all") categoryCondition = true;

		let filterCondition;
		if (filter.parameter === "status" || filter.parameter === "labGroup")
			filterCondition = application.feedback[filter.parameter].toLowerCase().includes(filter.value.toLowerCase());
		else filterCondition = application[filter.parameter].toLowerCase().includes(filter.value.toLowerCase());

		if (categoryCondition && filterCondition) {
			appCounter++;
			return (
				<StudentItem
					key={application._id}
					id={application._id}
					index={appCounter}
					names={application.names}
					surrname={application.surrname}
					pesel={application.pesel}
					date={date}
					status={status}
					labGroup={labGroup}
					canceled={application.metaData.canceled}
				/>
			);
		}
		return <Fragment key={application._id}></Fragment>;
	});

	return (
		<ul className={listClasses["list"]}>
			<div className={itemClasses["headers"]}>
				<div>L.p.</div>
				<div className={itemClasses["data"]}>Kandydat</div>
				<div className={itemClasses["data"]}>PESEL</div>
				<div className={itemClasses["data"]}>Data aplikacji</div>
			</div>
			{filteredStudentItems}
		</ul>
	);
}

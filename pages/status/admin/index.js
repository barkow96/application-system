import Filter from "@/components/admin-dedicated/Filter";
import StudentList from "@/components/admin-dedicated/StudentList";
import PageContent from "@/components/UI/PageContent";
import useFetchAppData from "@/utils/custom-hooks/useFetchAppData";
import Head from "next/head";
import { Fragment, useState } from "react";

export default function AdminPanelPage() {
	const { appData: applications, appError, appLoading } = useFetchAppData();
	const [filter, setFitler] = useState({ value: "", parameter: "names", category: "current" });

	let pageContent;
	if (appLoading) pageContent = <p>Proszę czekać, trwa szukanie aplikacji na serwerze...</p>;
	if (!appLoading && applications && applications.length > 0)
		pageContent = (
			<Fragment>
				<Filter setFilter={setFitler} />
				<h3>Lista studentów którzy złożyli aplikacje:</h3>
				<StudentList applications={applications} filter={filter} />
			</Fragment>
		);
	if (!appLoading && applications && !applications.length) pageContent = <p>Jeszcze nikt nie złożył aplikacji na studia.</p>;
	if (appError) pageContent = <p>{appError}</p>;

	return (
		<>
			<Head>
				<title>PAW: baza aplikacji</title>
				<meta name="description" content="Zweryfikuj aplikacje studentów" />
			</Head>
			<PageContent title="Status aplikacji">{pageContent}</PageContent>
		</>
	);
}

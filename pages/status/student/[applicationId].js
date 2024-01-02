import ApplicationForm from "@/components/application/ApplicationForm";
import StatusField from "@/components/UI/StatusField";
import PageContent from "@/components/UI/PageContent";
import PdfFile from "@/components/generate-pdf/PdfFile";
import PdfButton from "@/components/generate-pdf/PdfButton";
import { initialApplicationData as formData } from "@/utils/client/initialData";
import { fulfillApplicationForm, timeStampToDate } from "@/utils/misc/utils";
import useFetchAppData from "@/utils/custom-hooks/useFetchAppData";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import Head from "next/head";

const PDFDownloadLink = dynamic(() => import("@react-pdf/renderer").then((module) => module.PDFDownloadLink), {
	ssr: false,
	loading: () => <p>Ładowanie...</p>,
});

export default function StudentPanelPage() {
	const router = useRouter();
	const applicationId = router.query.applicationId === "undefined" ? undefined : router.query.applicationId;
	const { appData: application, appError, appLoading } = useFetchAppData(applicationId);

	if (application) fulfillApplicationForm(formData, application);

	const pdfDownloadButton =
		application && application.feedback.status === "ACCEPTED" ? (
			<PDFDownloadLink document={<PdfFile data={formData} />} fileName="Aplikacja PAW.pdf">
				{({ loading }) => (loading ? loading : <PdfButton text="Pobierz formularz w PDF" isActive={true} />)}
			</PDFDownloadLink>
		) : (
			<PdfButton text="Formularz w PDF dostępny po akceptacji zgłoszenia" isActive={false} />
		);

	let pageContent;
	if (appLoading) pageContent = <p>Proszę czekać, trwa szukanie Twojej aplikacji na serwerze...</p>;
	if (!appLoading && application)
		pageContent = (
			<Fragment>
				<section>
					<StatusField fieldData={timeStampToDate(application.metaData.timeStamp)}>Złożona dnia:</StatusField>
					<StatusField fieldData={application.feedback.status}>Status:</StatusField>
					<StatusField fieldData={application.feedback.providedBy}>Zweryfikowano przez:</StatusField>
					<StatusField fieldData={application.feedback.labGroup}>Grupa laboratoryjna:</StatusField>
					<StatusField fieldData={application.feedback.mainComment}>Komentarz do zgłoszenia:</StatusField>
					<div className="underline" />
				</section>
				<ApplicationForm
					initialFormData={formData}
					feedback={application.feedback.comments}
					userIsCheckingStatus={true}
					status={application.feedback.status}
					applicationId={applicationId}
				/>
				{pdfDownloadButton}
			</Fragment>
		);
	if (appError) pageContent = <p>{appError}</p>;

	return (
		<>
			<Head>
				<title>PAW: Twoje aplikacja</title>
				<meta name="description" content="Sprawdź status swojej aplikacji" />
			</Head>
			<PageContent title="Status aplikacji">{pageContent}</PageContent>
		</>
	);
}

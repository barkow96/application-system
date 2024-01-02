import ApplicationForm from "@/components/application/ApplicationForm";
import { initialApplicationData as formData } from "@/utils/client/initialData";
import useFetchAppData from "@/utils/custom-hooks/useFetchAppData";
import { fulfillApplicationForm } from "@/utils/misc/utils";
import Head from "next/head";
import { useRouter } from "next/router";

export default function AdminDetailPage() {
	const router = useRouter();
	const applicationId = router.query.applicationId === "undefined" ? undefined : router.query.applicationId;
	const { appData: application } = useFetchAppData(applicationId, router.isReady);
	const canceled = application ? application.metaData.canceled : false;

	if (application) fulfillApplicationForm(formData, application);

	return (
		<>
			<Head>
				<title>PAW: aplikacja studencka </title>
				<meta name="description" content="Zweryfikuj niniejszą aplikację" />
			</Head>
			<div>
				<h3>Informacje szczegółowe</h3>
				<ApplicationForm initialFormData={formData} isAdmin={true} applicationId={applicationId} canceled={canceled} />
			</div>
		</>
	);
}

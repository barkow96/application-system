import ApplicationForm from "@/components/application/ApplicationForm";
import PageContent from "@/components/UI/PageContent";
import { initialApplicationData as formData } from "@/utils/client/initialData";
import Head from "next/head";

export default function ApplicationPage() {
	return (
		<>
			<Head>
				<title>PAW: aplikuj</title>
				<meta name="description" content="Aplikuj na Programowanie Aplikacji Webowych 2023/2024" />
			</Head>
			<PageContent title="Aplikacja na studia PAW">
				<ApplicationForm initialFormData={formData} />
			</PageContent>
		</>
	);
}

import PageContent from "@/components/UI/PageContent";
import Head from "next/head";
import { useRouter } from "next/router";

export default function DeniedPage() {
	const router = useRouter();
	const content = router.query.message;

	return (
		<>
			<Head>
				<title>Dostęp zabroniony</title>
				<meta name="description" content="Nie masz dostępu do żądanych treści" />
			</Head>
			<PageContent title="Dostęp zabroniony">{content}</PageContent>
		</>
	);
}

import PageContent from "@/components/UI/PageContent";
import Head from "next/head";

export default function Error404Page() {
	return (
		<>
			<Head>
				<title>404</title>
				<meta name="description" content="Wystąpił błąd 404" />
			</Head>
			<PageContent title="Wystąpił błąd: 404 Not Found">Błąd po stronie klienta - żądany zasób nie istnieje.</PageContent>
		</>
	);
}

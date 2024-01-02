import PageContent from "@/components/UI/PageContent";
import Head from "next/head";

export default function Error500Page() {
	return (
		<>
			<Head>
				<title>500</title>
				<meta name="description" content="Wystąpił błąd 500" />
			</Head>
			<PageContent title="Wystąpił błąd: 500 Internal Server Error">Błąd wewnętrzny po stronie serwera.</PageContent>
		</>
	);
}

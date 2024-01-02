import PageContent from "@/components/UI/PageContent";
import Button from "@/components/UI/Button";
import { connectToDatabase } from "./api/utils/db";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCode } from "@fortawesome/free-solid-svg-icons";

const iconStyles = { display: "block", marginBottom: "20px", color: "rgb(167, 25, 48)", fontSize: "250px", margin: "auto" };

export default function HomePage({ description = null }) {
	const { data: session } = useSession();

	return (
		<>
			<Head>
				<title>System aplikacyjny PAW</title>
				<meta name="description" content="Aplikuj na Programowanie Aplikacji Webowych na AGH bez wychodzenia z domu" />
			</Head>
			<PageContent title="O studiach">
				<FontAwesomeIcon icon={faFileCode} style={iconStyles} />
				<p>{description}</p>
				{!session && <Button path="/auth">Zaloguj się by aplikować</Button>}
			</PageContent>
		</>
	);
}

export async function getStaticProps() {
	const client = await connectToDatabase();
	const db = client.db();

	const response = await db.collection("pages-data").find({ page: "index" }).toArray();
	const description = response[0].data.description;
	client.close();

	return { props: { description } };
}

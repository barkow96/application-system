import PageContent from "@/components/UI/PageContent";
import StatusField from "@/components/UI/StatusField";
import { timeStampToDate } from "@/utils/misc/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function AccountPage() {
	const { data: session } = useSession();

	const email = session ? session.user.email : "brak danych";
	const accountType = session ? session.user.role : "brak danych";
	const date = session ? timeStampToDate(session.user.timeStamp) : "brak danych";

	return (
		<>
			<Head>
				<title>PAW: Twoje konto</title>
				<meta name="description" content="Sprawdź podstawowe informacje o swoim koncie" />
			</Head>
			<PageContent title="Konto użytkownika">
				<StatusField fieldData={accountType}>Uprawnienia:</StatusField>
				<StatusField fieldData={email}>Adres e-mail:</StatusField>
				<StatusField fieldData={date}>Założone dnia:</StatusField>
				<div className="underline" />
			</PageContent>
		</>
	);
}

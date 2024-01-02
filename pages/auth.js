import AuthForm from "@/components/auth-form/AuthForm";
import PageContent from "@/components/UI/PageContent";
import Head from "next/head";

export default function AuthenticationPage() {
	return (
		<>
			<Head>
				<title>PAW: logowanie</title>
				<meta name="description" content="Zaloguj się do systemu" />
			</Head>
			<PageContent title="Panel logowania">
				<AuthForm />
			</PageContent>
		</>
	);
}

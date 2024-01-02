import { nextAuthConfig } from "../auth/[...nextauth]";
import { connectToDatabase } from "../utils/db";
import isHexadecimal24 from "@/utils/validation/validate";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

export default async function GET(req, res) {
	//PROTECTING THE API FROM UNAUTHENTICATED REQUESTS
	const session = await getServerSession(req, res, nextAuthConfig);
	if (!session) {
		res.status(401).json({ message: "Żądanie od nieuwierzytelnionego użytkownika!" });
		return;
	}

	//VERIFYING IF APPLICATION_ID IS PROVIDED
	const applicationId = req.query.appId;
	if (applicationId === "undefined" || applicationId === "null" || !applicationId) {
		res.status(400).json({ message: "Aplikacja nie została jeszcze złożona!" });
		return;
	}

	//VERIFYING IF APPLICATION_ID IS 24 DECIMAL HEX STRING
	if (!isHexadecimal24(applicationId)) {
		res.status(400).json({ message: "Błędny numer aplikacji!" });
		return;
	}

	//CONNECTING TO DATABASE
	const client = await connectToDatabase();
	const db = client.db();

	//SEARCHING FOR GIVEN APPLICATION_ID AND RESPONDING WITH APPLICATION TO THE USER
	const existingApplication = await db.collection("applications").findOne({ _id: new ObjectId(applicationId) });
	if (!existingApplication) res.status(404).json({ message: "Nie ma takiej aplikacji!" });
	else if (session.user.role === "student" && existingApplication.metaData._user !== session.user.email)
		res.status(401).json({ message: "Nie masz uprawnień do wglądu w tą aplikację!" });
	else res.status(200).json({ message: "Zwracam żądaną aplikację.", data: existingApplication });

	client.close();
}

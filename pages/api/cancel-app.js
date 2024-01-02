import { nextAuthConfig } from "./auth/[...nextauth]";
import { connectToDatabase } from "./utils/db";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

export default async function POST(req, res) {
	//PROTECTING THE API FROM UNAUTHENTICATED REQUESTS
	const session = await getServerSession(req, res, nextAuthConfig);
	if (!session) {
		res.status(401).json({ message: "Żądanie od nieuwierzytelnionego użytkownika!" });
		return;
	}

	//CONNECTING TO DATABASE
	const client = await connectToDatabase();
	const db = client.db();

	//SEARCHING FOR APPLICATION
	const data = req.body;
	const appFilter = { _id: new ObjectId(data._appId) };
	const existingApplication = await db.collection("applications").findOne(appFilter);
	if (!existingApplication) {
		res.status(404).json({ message: "Nie ma takiej aplikacji!" });
		client.close();
		return;
	}

	//VERIFYING IF USER IS AUTHORIZED
	if (session.user.role === "student" && existingApplication.metaData._user !== session.user.email) {
		res.status(401).json({ message: "Nie masz uprawnień do wglądu w tą aplikację!" });
		client.close();
		return;
	}

	existingApplication.metaData.actionTick++;
	existingApplication.metaData.canceled = true;
	existingApplication.metaData.latest = false;

	const updatedApplication = { $set: existingApplication };
	await db.collection("applications").updateOne(appFilter, updatedApplication);

	const userFilter = { email: session.user.email };
	const updatedUser = { $set: { applicationId: null } };
	await db.collection("users").updateOne(userFilter, updatedUser);

	res.status(200).json({ message: "Aplikacja wycofana poprawnie!", applicationId: data._appId });
	client.close();
}

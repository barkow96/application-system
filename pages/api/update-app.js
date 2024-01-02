import { nextAuthConfig } from "./auth/[...nextauth]";
import { checkData } from "@/utils/server/checkData";
import { connectToDatabase } from "./utils/db";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

export default async function POST(req, res) {
	const data = req.body;
	const appId = data.metaData._appId;

	//PROTECTING THE API FROM UNAUTHENTICATED REQUESTS
	const session = await getServerSession(req, res, nextAuthConfig);
	if (!session) {
		res.status(401).json({ message: "Żądanie od nieuwierzytelnionego użytkownika!" });
		return;
	}

	//SERVER-SIDE DATA VALIDATION
	const { isCorrect: isReceivedDataValid, resMessage } = checkData(data);
	if (!isReceivedDataValid) {
		res.status(422).json({ message: resMessage });
		return;
	}

	//CONNECTING TO DATABASE
	const client = await connectToDatabase();
	const db = client.db();

	//GETTING EXISTING APPLICATION FROM DATABASE
	const filter = { _id: new ObjectId(appId) };
	const existingApplication = await db.collection("applications").findOne(filter);
	if (!existingApplication) {
		res.status(404).json({ message: "Nie ma takiej aplikacji!" });
		client.close();
		return;
	}

	//UPDATING APPLICATION
	for (const key in data) {
		if (key === "metaData") continue;
		existingApplication[key] = data[key];
	}
	existingApplication.metaData.actionTick = existingApplication.metaData.actionTick + 1;
	existingApplication.feedback.status = "PENDING";

	//ADDING APPLICATION TO DATABASE
	const updatedApplication = { $set: existingApplication };
	await db.collection("applications").updateOne(filter, updatedApplication);
	res.status(200).json({ message: "Aplikacja zaktualizowana poprawnie!", applicationId: appId });
	client.close();
}

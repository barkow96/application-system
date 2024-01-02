import { nextAuthConfig } from "./auth/[...nextauth]";
import { connectToDatabase } from "./utils/db";
import isHexadecimal24 from "@/utils/validation/validate";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

export default async function POST(req, res) {
	//PROTECTING THE API FROM UNAUTHENTICATED REQUESTS
	const session = await getServerSession(req, res, nextAuthConfig);
	if (!session) {
		res.status(401).json({ message: "Żądanie od nieuwierzytelnionego użytkownika!" });
		return;
	}

	//VERIFYING IF APPLICATION_ID IS 24 DECIMAL HEX STRING
	const data = req.body;
	if (!isHexadecimal24(data._appId)) {
		res.status(400).json({ message: "Błędny numer aplikacji!" });
		return;
	}

	//CONNECTING TO DATABASE
	const client = await connectToDatabase();
	const db = client.db();

	//SEARCHING FOR APPLICATION
	const filter = { _id: new ObjectId(data._appId) };
	const existingApplication = await db.collection("applications").findOne(filter);
	if (!existingApplication) {
		res.status(404).json({ message: "Nie ma takiej aplikacji!" });
		client.close();
		return;
	}

	//PROVIDING FEEDBACK AND METADADTA
	existingApplication.feedback.providedBy = session.user.email;
	existingApplication.feedback.timeStamp = Date.now();
	existingApplication.metaData.actionTick++;
	if (data.status === "REJECTED") {
		existingApplication.feedback.status = "REJECTED";
		existingApplication.feedback.labGroup = "NONE";
	}

	//ADDING FEEDBACK TO EXISTING APPLICATION
	else {
		existingApplication.feedback.status = data.status;
		existingApplication.feedback.labGroup = data.labGroup;
		existingApplication.feedback.mainComment = data.mainComment.length > 0 ? data.mainComment : null;
		existingApplication.feedback.comments = {};
		for (const key in data) {
			if (key === "_appId" || key === "labGroup" || key === "status" || key === "mainComment") continue;
			existingApplication[key] = data[key].value;
			existingApplication.feedback.comments[key] = data[key].comment;
		}
	}

	const updatedApplication = { $set: existingApplication };
	await db.collection("applications").updateOne(filter, updatedApplication);
	res.status(200).json({ message: "Dokonano recenzji aplikacji!" });
	client.close();
}

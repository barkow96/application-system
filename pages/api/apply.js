import { nextAuthConfig } from "./auth/[...nextauth]";
import { connectToDatabase } from "./utils/db";
import { checkData } from "@/utils/server/checkData";
import { getServerSession } from "next-auth";

export default async function POST(req, res) {
	const data = req.body;

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

	//CHECKING IF NOT APPLIED YET
	const existingApplication = await db.collection("applications").findOne({ metaData: { _user: data.metaData._user } });
	if (existingApplication) {
		res.status(403).json({ message: "Aplikowałeś już na studia!" });
		client.close();
		return;
	}

	//INSERTING APPLICATION INTO DATABASE
	data.metaData = { timeStamp: Date.now(), _user: data.metaData._user, actionTick: 1, canceled: false, latest: true };
	data.feedback = { providedBy: null, timeStamp: null, mainComment: null, comments: null, labGroup: "NONE", status: "PENDING" };
	const addApplicationResult = await db.collection("applications").insertOne(data);

	//ASSIGNING APPLICATION TO USER
	const filter = { email: data.metaData._user };
	const id = addApplicationResult.insertedId;
	const updatedUser = { $set: { applicationId: id } };
	await db.collection("users").updateOne(filter, updatedUser);

	res.status(201).json({ message: "Aplikacja złożona poprawnie!", applicationId: id });
	client.close();
}

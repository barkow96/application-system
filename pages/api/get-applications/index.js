import { nextAuthConfig } from "../auth/[...nextauth]";
import { connectToDatabase } from "../utils/db";
import { getServerSession } from "next-auth";

export default async function GET(req, res) {
	//PROTECTING THE API FROM UNAUTHENTICATED REQUESTS
	const session = await getServerSession(req, res, nextAuthConfig);
	if (!session || session.user.role === "student") {
		res.status(401).json({ message: "Żądanie od nieuwierzytelnionego użytkownika!" });
		return;
	}

	//CONNECTING TO DATABASE
	const client = await connectToDatabase();
	const db = client.db();

	//TRANSFERING APPLICATIONS FROM DATABASE TO THE CLIENT APPLICATION
	const query = {};
	const options = {
		projection: { _id: 1, names: 1, surrname: 1, pesel: 1, feedback: { status: 1, labGroup: 1 }, metaData: { timeStamp: 1, latest: 1, canceled: 1 } },
	};
	const applications = await db.collection("applications").find(query, options).toArray();

	res.status(200).json({ message: "Zwracam żądane aplikacje.", data: applications });
	client.close();
}

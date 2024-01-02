import { MongoClient } from "mongodb";

const mongoDbCredentials = process.env.DB_CREDENTIALS;

export async function connectToDatabase() {
	const client = await MongoClient.connect(mongoDbCredentials);
	return client;
}

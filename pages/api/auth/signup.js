import { hashPassword } from "@/utils/server/passwords";
import { checkIfEmailCorrect, checkIfPasswordCorrect, checkIfPasswordsMatch } from "@/utils/validation/validateInput";
import { connectToDatabase } from "../utils/db";

export default async function POST(req, res) {
	const { email, password1, password2 } = req.body;

	//SERVER-SIDE DATA VALIDATION
	if (
		!email ||
		!checkIfEmailCorrect(email).test ||
		!password1 ||
		!checkIfPasswordCorrect(password1).test ||
		!password2 ||
		!checkIfPasswordsMatch(password1, password2).test
	) {
		res.status(422).json({ message: "Nieprawidłowe dane rejestracji!" });
		return;
	}

	//CONNECTING TO DATABASE
	const client = await connectToDatabase();
	const db = client.db();

	//CHECKING IF USER ALREADY EXISTS
	const existingUser = await db.collection("users").findOne({ email: email });
	if (existingUser) {
		res.status(403).json({ message: "Taki użytkownik jest już zarejestrowany!" });
		client.close();
		return;
	}

	//TRYING TO INSERT THE NEW USER INTO DATABASE
	try {
		const hashedPassword = await hashPassword(password1);
		const newUser = { email: email, password: hashedPassword, role: "student", timeStamp: Date.now(), applicationId: null };
		await db.collection("users").insertOne(newUser);

		res.status(201).json({ message: "Stworzono konto użytkownika!" });
		client.close();
	} catch (error) {
		res.status(500).json({ error: `Błąd po stronie serwera, kod: ${error}.` });
		client.close();
	}
}

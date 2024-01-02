import { verifyPassword } from "@/utils/server/passwords";
import { connectToDatabase } from "../utils/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthConfig = {
	session: { strategy: "jwt", maxAge: 10 * 60 },
	secret: process.env.NEXTAUTH_SECRET,
	site: process.env.NEXTAUTH_URL,
	providers: [
		CredentialsProvider({
			name: "Credentials",
			async authorize(credentials) {
				const client = await connectToDatabase();

				const usersCollection = client.db().collection("users");
				const user = await usersCollection.findOne({ email: credentials.email });

				if (!user) {
					client.close();
					throw new Error("Nie ma takiego użytkownika!");
				}

				const isValid = await verifyPassword(credentials.password, user.password);

				if (!isValid) {
					client.close();
					throw new Error("Nieprawidłowe dane logowania!");
				}

				client.close();
				return user;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, session, trigger }) {
			if (user) {
				token.role = user.role;
				token.timeStamp = user.timeStamp;
				token.applicationId = user.applicationId;
			}
			if (trigger === "update") token.applicationId = session.applicationId;

			return token;
		},
		async session({ session, token }) {
			session.user.role = token.role;
			session.user.timeStamp = token.timeStamp;
			session.user.applicationId = token.applicationId;
			return session;
		},
	},
	pages: {
		signIn: "/auth",
		signOut: "/auth",
		error: "/error",
		accessDenied: "/denied",
	},
};

export default NextAuth(nextAuthConfig);

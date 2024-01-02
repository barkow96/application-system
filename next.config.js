/** @type {import('next').NextConfig} */
const { PHASE_PRODUCTION_SERVER } = require("next/constants");

module.exports = (phase) => {
	const dbUsername = "USERNAME_PLACEHOLDER";
	const dbPassword = "PASSWORD_PLACEHOLDER";
	const dbName = "DATABASE_NAME_PLACEHOLDER";

	const DB_CREDENTIALS = `mongodb+srv://${dbUsername}:${dbPassword}@agh.qcaozxp.mongodb.net/${dbName}?retryWrites=true&w=majority`;
	const NEXTAUTH_SECRET = "fZ7Lww9ffvh/6mXmZqhEC4Xp5qaUrpL/yrHfU2GgcAw=";
	let NEXTAUTH_URL = "http://localhost:3000";
	if (phase === PHASE_PRODUCTION_SERVER) NEXTAUTH_URL = "http://localhost:3000";

	return {
		reactStrictMode: true,
		env: {
			DB_CREDENTIALS: DB_CREDENTIALS,
			NEXTAUTH_SECRET: NEXTAUTH_SECRET,
			NEXTAUTH_URL: NEXTAUTH_URL,
		},
	};
};

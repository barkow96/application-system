import { postData } from "../misc/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function usePostAppData() {
	const { update: updateSession } = useSession();
	const router = useRouter();
	const [appError, setAppError] = useState(null);

	async function postAppData(url, submittedData, settings) {
		const { response, data } = await postData(url, submittedData);
		const action = settings.action;

		let redirect, updSessionData;
		if (action === "student-apply") {
			redirect = `/status/student/${data.applicationId}`;
			updSessionData = { applicationId: data.applicationId };
		} else if (action === "student-update") {
			redirect = "/";
			updSessionData = { applicationId: data.applicationId };
		} else if (action === "student-cancel") {
			redirect = "/";
			updSessionData = { applicationId: null };
		} else if (action === "admin-verify") {
			redirect = "/status/admin";
			updSessionData = null;
		}

		if (response.ok) {
			if (updSessionData) updateSession(updSessionData);
			router.replace(redirect);
		} else setAppError(data.message);
	}

	return { appError, postAppData };
}

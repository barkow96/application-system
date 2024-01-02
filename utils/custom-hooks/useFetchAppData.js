import { useEffect, useState } from "react";

export default function useFetchAppData(applicationId = null, routerReady = true) {
	const [appData, setAppData] = useState(null);
	const [appError, setAppError] = useState(null);
	const [appLoading, setAppLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			let url = "/api/get-applications";
			url = applicationId ? url + `/${applicationId}` : url;

			const response = await fetch(url);
			const responseData = await response.json();

			setAppLoading(false);
			if (!response.ok) setAppError(responseData.message);
			else setAppData(responseData.data);
		}

		if (routerReady) fetchData();
	}, [applicationId, routerReady]);

	return { appData, appError, appLoading };
}

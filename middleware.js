import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(request) {
		const pathName = request.nextUrl.pathname;
		const token = request.nextauth.token;
		const url = request.url;

		function createUrlWithMessage(message) {
			const newUrl = new URL("/denied", url);
			newUrl.searchParams.set("message", message);
			return newUrl;
		}

		if (pathName.startsWith("/status/admin") && (!token || token.role !== "admin")) {
			const newUrl = createUrlWithMessage("Ta strona jest dostępna tylko dla zalogowanych adminów.");
			return NextResponse.rewrite(newUrl);
		}
		if (pathName.startsWith("/status/student") && (!token || token.role !== "student")) {
			const newUrl = createUrlWithMessage("Ta strona jest dostępna tylko dla zalogowanych studentów.");
			return NextResponse.rewrite(newUrl);
		}
		if ((pathName.startsWith("/account") || pathName.startsWith("/application") || pathName.startsWith("/status")) && !token) {
			const newUrl = createUrlWithMessage("Ta strona jest dostępna po zalogowaniu.");
			return NextResponse.rewrite(newUrl);
		}
		if (pathName.startsWith("/application") && token.role !== "student") {
			const newUrl = createUrlWithMessage("Ta strona jest dostępna tylko dla zalogowanych studentów.");

			return NextResponse.rewrite(newUrl);
		}
		if (pathName.startsWith("/application") && token.role === "student" && token.applicationId) {
			const newUrl = createUrlWithMessage("Złożyłeś już aplikację na studia.");
			return NextResponse.rewrite(newUrl);
		}
	},
	{ callbacks: { authorized: () => true } }
);

export const config = { matcher: ["/account", "/application", "/status", "/status/admin", "/status/student/(.*)"] };

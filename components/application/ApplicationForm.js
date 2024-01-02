import classes from "./ApplicationForm.module.scss";
import ApplicationFormButton from "./ApplicationFormButton";
import Input from "../UI/Input";
import AdminPanel from "./AdminPanel";
import usePostAppData from "@/utils/custom-hooks/usePostAppData";
import { dictionary } from "@/utils/misc/utils";
import formDataReducer from "@/utils/client/formDataReducer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useReducer, useRef } from "react";

export default function ApplicationForm({
	initialFormData,
	feedback = null,
	isAdmin = false,
	userIsCheckingStatus = false,
	status = null,
	applicationId = null,
	canceled = false,
}) {
	const { data: session, status: sessionStatus } = useSession();
	const router = useRouter();
	const [formData, dispatch] = useReducer(formDataReducer, initialFormData);
	const { appError, postAppData } = usePostAppData();
	const adminPanelRef = useRef(null);

	const buttonDisplayLogic = { isAdmin, userIsCheckingStatus, status, canceled };
	const adminPanelDisplayLogic = isAdmin && !canceled;

	let formIsValid = true;
	for (const key in formData) if (!formData[key].isValid) formIsValid = false;

	async function buttonHandler(event, action) {
		event.preventDefault();
		let submittedFormData, mainComment, mode, group;

		switch (action) {
			case "APPLY":
				submittedFormData = { metaData: { _user: session.user.email, _appId: null } };
				for (const key in formData) submittedFormData[key] = formData[key].value;

				await postAppData("/api/apply", submittedFormData, { action: "student-apply" });
				break;
			case "UPDATE":
				applicationId = router.query.applicationId;
				submittedFormData = { metaData: { _user: session.user.email, _appId: applicationId } };
				for (const key in formData) submittedFormData[key] = formData[key].value;

				await postAppData("/api/update-app", submittedFormData, { action: "student-update" });
				break;
			case "CANCEL":
				await postAppData("/api/cancel-app", { _appId: applicationId }, { action: "student-cancel" });
				break;
			case "VERIFY":
				mainComment = adminPanelRef.current.commentRef.current.value;
				mode = adminPanelRef.current.modeRef.current.value;
				group = adminPanelRef.current.groupRef.current.value;
				submittedFormData = { _appId: applicationId, mainComment: mainComment, labGroup: group, status: mode };
				for (const key in formData) submittedFormData[key] = { value: formData[key].value, comment: formData[key].comment };

				await postAppData("/api/review-app", submittedFormData, { action: "admin-verify" });
				break;
			default:
				break;
		}
	}

	const formInputs = [];
	for (const key in formData) {
		const inputAttributes = {
			key: key,
			type: "text",
			name: key,
			property: formData[key],
			dispatch: dispatch,
			feedback: feedback ? feedback[key] : null,
			isAdmin: isAdmin,
			userIsCheckingStatus: userIsCheckingStatus,
			status: status,
			canceled: canceled,
		};

		if (key === "dateOfBirth") inputAttributes.type = "date";
		else if (key === "phone") inputAttributes.type = "tel";
		else if (key === "educationInPoland") inputAttributes.type = "checkbox";

		formInputs.push(<Input {...inputAttributes}>{dictionary[key]}</Input>);
	}
	const button = <ApplicationFormButton buttonDisplayLogic={buttonDisplayLogic} onClick={buttonHandler} formIsValid={formIsValid} />;

	return (
		<>
			<section>
				<form>{formInputs}</form>
			</section>

			{adminPanelDisplayLogic && (
				<section>
					<AdminPanel ref={adminPanelRef} />
				</section>
			)}

			{(button || appError) && (
				<section>
					{button && <div className={classes["actions"]}>{button}</div>}

					{appError && (
						<div className={classes["error"]}>
							<span>Serwer zwraca błąd: </span> {appError}
						</div>
					)}
				</section>
			)}
		</>
	);
}

import classes from "./AuthForm.module.scss";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { initialAuthData as authData } from "@/utils/client/initialData";
import formDataReducer from "@/utils/client/formDataReducer";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useReducer, useState } from "react";

export default function AuthForm() {
	const router = useRouter();
	const [formData, dispatch] = useReducer(formDataReducer, authData);
	const [authMode, setAuthMode] = useState("login");
	const [authError, setAuthError] = useState(null);

	const formIsValid =
		authMode === "login"
			? formData.email.isValid && formData.password1.isValid
			: formData.email.isValid && formData.password1.isValid && formData.password2.isValid;

	function toggleHandler() {
		setAuthError(null);
		if (authMode === "login") setAuthMode("signup");
		else setAuthMode("login");
	}

	async function submitHandler(event) {
		event.preventDefault();
		const submittedFormData = {};
		for (const key in formData) submittedFormData[key] = formData[key].value;

		switch (authMode) {
			case "signup":
				const signupResponse = await fetch("/api/auth/signup", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(submittedFormData),
				});

				if (signupResponse.ok) router.replace("/");
				else {
					const signupData = await signupResponse.json();
					setAuthError(signupData.message);
				}
				break;

			case "login":
				const loginResponse = await signIn("credentials", { redirect: false, email: submittedFormData.email, password: submittedFormData.password1 });

				if (loginResponse.ok) router.replace("/");
				else setAuthError(loginResponse.error);
				break;

			default:
				break;
		}
	}

	return (
		<form className={classes.form}>
			<Input type="text" name="email" property={formData.email} dispatch={dispatch} styles={{ width: "100%" }} tab={0}>
				Adres e-mail
			</Input>

			<Input type="password" name="password1" property={formData.password1} dispatch={dispatch} styles={{ width: "100%" }} tab={0}>
				Hasło
			</Input>

			{authMode === "signup" && (
				<Input type="password" name="password2" property={formData.password2} dispatch={dispatch} styles={{ width: "100%" }} tab={0}>
					Powtórz hasło
				</Input>
			)}
			<div className={classes.actions}>
				<Button onClickHandler={toggleHandler} styles={{ backgroundColor: "transparent", color: "black", border: "none" }}>
					{authMode === "login" ? "Nie masz konta? Zarejestruj się!" : "Masz już konto? Zaloguj się!"}
				</Button>
				<Button onClickHandler={submitHandler} isActive={formIsValid}>
					{authMode === "login" ? "Zaloguj się" : "Zarejestruj się"}
				</Button>
			</div>
			{authError && <p className={classes.text}>{authError}</p>}
		</form>
	);
}

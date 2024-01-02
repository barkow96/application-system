import classes from "./AdminPanel.module.scss";
import SelectField from "../UI/SelectField";
import { forwardRef, useImperativeHandle, useRef } from "react";

const groupOptions = [
	{ value: "NONE", text: "NONE" },
	{ value: "A", text: "A" },
	{ value: "B", text: "B" },
	{ value: "C", text: "C" },
	{ value: "D", text: "D" },
];

const modeOptions = [
	{ value: "VERIFY", text: "Wyślij do poprawy" },
	{ value: "ACCEPTED", text: "Przyjmij natychmiastowo na studia" },
	{ value: "REJECTED", text: "Odrzuć" },
];

const AdminPanel = forwardRef((props, ref) => {
	const commentRef = useRef(null);
	const modeRef = useRef(null);
	const groupRef = useRef(null);

	useImperativeHandle(ref, () => ({ commentRef, modeRef, groupRef }));

	return (
		<>
			<h3>Panel administrowania zgłoszeniem:</h3>
			<textarea
				type="text"
				id="annotation"
				name="annotation"
				placeholder="Skomentuj zgłoszenie"
				className={classes["annotation-field"]}
				ref={commentRef}
			/>

			<div className={classes["selections"]}>
				<SelectField label="Tryb" name="accept" options={modeOptions} ref={modeRef} />
				<SelectField label="Grupa laboratoryjna" name="group" options={groupOptions} ref={groupRef} />
			</div>
		</>
	);
});

export default AdminPanel;

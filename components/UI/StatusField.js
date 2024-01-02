export default function StatusField({ children, fieldData }) {
	const statusField = fieldData && fieldData !== "NONE" ? fieldData : "brak";

	return (
		<p>
			<b>{children}</b> {statusField}
		</p>
	);
}

import Button from "../UI/Button";

export default function PdfButton({ text, isActive }) {
	return (
		<Button styles={{ width: "100%", marginTop: 10 }} isActive={isActive}>
			{text}
		</Button>
	);
}

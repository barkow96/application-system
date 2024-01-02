import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
	family: "Roboto",
	fonts: [
		{ fontWeight: 400, src: "http://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf" },
		{ fontWeight: 700, src: "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf" },
	],
});

export const styles = StyleSheet.create({
	page: {
		fontFamily: "Roboto",
	},
	image: {
		width: 120,
		height: 120,
		marginBottom: 0,
		margin: "auto",
	},
	header: {
		width: "80%",
		margin: "auto",
		marginTop: 0,
		marginBottom: 10,
		textAlign: "center",
	},
	headerTextBig: { fontSize: 20 },
	headerTextSmall: { fontSize: 16 },
	main: {
		fontSize: 14,
		marginLeft: 50,
	},
	footer: {
		width: "90%",
		margin: "auto",
		marginTop: 25,
		fontSize: 12,
	},
	flex: {
		display: "flex",
		flexDirection: "row",
		marginTop: 25,
		textAlign: "center",
	},
	column: {
		width: "50%",
		fontSize: 10,
	},
});

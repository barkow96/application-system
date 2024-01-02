import { styles } from "./PdfFile.styles";
import { dictionary } from "@/utils/misc/utils";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";

export default function PdfFile({ data }) {
	const appFields = [];
	for (const key in dictionary) {
		const firstPart = dictionary[key];
		let secondPart = data[key].value;
		if (key === "educationInPoland" && data[key].value === true) secondPart = "tak";
		else if (key === "educationInPoland" && data[key].value === false) secondPart = "nie";

		const fullField = firstPart + ": " + secondPart;
		appFields.push(<Text>{fullField}</Text>);
	}

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<Image src="/img/AGH-logo.jpg" style={styles.image} />
				<View style={styles.header}>
					<Text style={styles.headerTextBig}>AGH</Text>
					<Text style={styles.headerTextSmall}>Akademia Górniczo-Hutnicza</Text>
					<Text style={styles.headerTextSmall}>im. Stanisława Staszica w Krakowie</Text>
				</View>
				<View style={styles.header}>
					<Text style={styles.headerTextBig}>FORMULARZ ZGŁOSZENIOWY</Text>
					<Text style={styles.headerTextSmall}>na studia podyplomowe w roku akademickim 2023/2024</Text>
					<Text style={styles.headerTextSmall}>PROGRAMOWANIE APLIKACJI WEBOWYCH</Text>
				</View>
				<View style={styles.header}>
					<Text style={styles.headerTextSmall}>organizowane przez</Text>
					<Text style={styles.headerTextSmall}>
						Wydział Elektrotechniki, Automatyki, Informatyki i Inżynierii Biomedycznej, Katedra Informatyki Stosowanej
					</Text>
				</View>
				<View style={styles.main}>{appFields}</View>
				<View style={styles.footer}>
					<Text>Poświadczam własnoręcznym podpisem prawdziwość danych zamieszczonych w niniejszym formularzu.</Text>
					<View style={styles.flex}>
						<Text style={styles.column}>miejscowość i data: ...................................</Text>
						<Text style={styles.column}>czytelny podpis: ...................................</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
}

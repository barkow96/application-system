import Navigation from "../navigation/Navigation";
import Container from "./Container";
import Footer from "../navigation/Footer";

export default function Layout(props) {
	return (
		<>
			<Navigation />
			<Container>{props.children}</Container>
			<Footer />
		</>
	);
}

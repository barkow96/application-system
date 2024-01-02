import classes from "./Filter.module.scss";

export default function Filter({ setFilter }) {
	function parameterchangeHandler() {
		setFilter((prevState) => ({ ...prevState, parameter: event.target.value }));
	}
	function valueChangeHandler(event) {
		setFilter((prevState) => ({ ...prevState, value: event.target.value }));
	}
	function categoryChangeHandler(event) {
		setFilter((prevState) => ({ ...prevState, category: event.target.value }));
	}

	return (
		<form className={classes.form}>
			<h3 className={classes.text}>Szybkie wyszukiwanie:</h3>
			<label htmlFor="parameter">Filtruj według</label>
			<select id="parameter" onChange={parameterchangeHandler}>
				<option value="names">Imię</option>
				<option value="surrname">Nazwisko</option>
				<option value="pesel">Pesel</option>
				<option value="status">Status aplikacji</option>
				<option value="labGroup">Grupa</option>
			</select>
			<input type="text" id="value" onChange={valueChangeHandler} placeholder="Szukana fraza" />
			<label htmlFor="parameter">Pokaż aplikacje</label>
			<select id="category" onChange={categoryChangeHandler}>
				<option value="current">Bieżące</option>
				<option value="archival">Archiwalne</option>
				<option value="all">Wszystkie</option>
			</select>
		</form>
	);
}

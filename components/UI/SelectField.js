import classes from "./SelectField.module.scss";
import { Fragment, forwardRef } from "react";

const SelectField = forwardRef(({ label, name, options }, ref) => {
	return (
		<Fragment>
			<label htmlFor={name}>{label}:</label>
			<select id={name} name={name} className={classes["selection-field"]} ref={ref} required>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.text}
					</option>
				))}
			</select>
		</Fragment>
	);
});

export default SelectField;

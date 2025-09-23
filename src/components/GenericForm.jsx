import { useState } from "react";
import "../styles/GenericForm.scss";

export default function GenericForm({ fields, onSubmit, submitLabel }) {
	//initalise les valeurs des champs
	const initalValues = {};
	fields.forEach((field) => {
		initalValues[field.name] = field.defaultValue || "";
	});
	const [Values, setValues] = useState(initalValues);

	const handleChange = (e) => {
		setValues({
			...Values,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(Values);
	};
	return (
		<form onSbubmit={handleSubmit} className="generic-form">
			{fields.map((field) => (
				<div key={field.name} className="form-group">
					<label>{field.label}</label>
					{field.type === "textarea" ? (
						<textarea
							name={field.name}
							value={Values[field.name]}
							onChange={handleChange}
							placeholder={field.placeholder || ""}
						/>
					) : (
						<input
							type={field.type || "text"}
							name={field.name}
							value={Values[field.name]}
							onChange={handleChange}
							placeholder={field.placeholder || ""}
						/>
					)}
				</div>
			))}
			<button type="submit">{submitLabel || "Submit"}</button>
		</form>
	);
}

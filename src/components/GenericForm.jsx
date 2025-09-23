import { useState } from "react";
import "../styles/GenericForm.scss";

export default function GenericForm({ fields, onSubmit, submitLabel }) {
	// Initialise les valeurs des champs
	const initialValues = {};
	fields.forEach((field) => {
		initialValues[field.name] = field.defaultValue || "";
	});
	const [values, setValues] = useState(initialValues);

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(values); // Ici on envoie les données au parent (Manager.jsx)
	};

	return (
		<form onSubmit={handleSubmit} className="generic-form">
			{fields.map((field) => (
				<div key={field.name} className="form-group">
					<label>{field.label}</label>
					{field.type === "textarea" ? (
						<textarea
							name={field.name}
							value={values[field.name]}
							onChange={handleChange}
							placeholder={field.placeholder || ""}
						/>
					) : (
						<input
							type={field.type || "text"}
							name={field.name}
							value={values[field.name]}
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

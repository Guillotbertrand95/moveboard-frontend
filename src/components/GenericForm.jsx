import { useState, useEffect } from "react";
import "../styles/GenericForm.scss";

export default function GenericForm({
	fields,
	onSubmit,
	submitLabel,
	initialData = {},
}) {
	// Initialise les valeurs avec initialData OU valeur par défaut
	const getInitialValues = () => {
		const initialValues = {};
		fields.forEach((field) => {
			initialValues[field.name] =
				initialData[field.name] || field.defaultValue || "";
		});
		return initialValues;
	};

	const [values, setValues] = useState(getInitialValues);

	// Si initialData change (quand tu passes en mode "edit"), on met à jour
	useEffect(() => {
		setValues(getInitialValues());
	}, [initialData]);

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("💡 Data envoyée :", values);
		onSubmit(values);
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

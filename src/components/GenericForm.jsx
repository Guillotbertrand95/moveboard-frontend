import { useState } from "react";
import "../styles/GenericForm.scss";

export default function GenericForm({
	fields,
	onSubmit,
	submitLabel,
	initialData = {},
}) {
	// Initialise les valeurs une seule fois, au montage
	const initialValues = fields.reduce((acc, field) => {
		acc[field.name] = initialData[field.name] ?? field.defaultValue ?? "";
		return acc;
	}, {});

	const [values, setValues] = useState(initialValues);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(values);
		// Optionnel : reset après submit si nécessaire
		// setValues(initialValues);
	};

	return (
		<form onSubmit={handleSubmit} className="generic-form">
			{fields.map((field) => (
				<div key={field.name} className="form-group">
					<label htmlFor={field.name}>{field.label}</label>

					{field.type === "textarea" ? (
						<textarea
							id={field.name}
							name={field.name}
							value={values[field.name]}
							onChange={handleChange}
							placeholder={field.placeholder || ""}
						/>
					) : field.type === "select" ? (
						<select
							id={field.name}
							name={field.name}
							value={values[field.name]}
							onChange={handleChange}
						>
							{/* Option vide par défaut */}
							<option value="">-- Sélectionner --</option>

							{/* Supporte à la fois un tableau simple ["bar", "cuisine"] 
                  ou un tableau d’objets [{ value, label }] */}
							{field.options?.map((opt) => (
								<option
									key={opt.value || opt}
									value={opt.value || opt}
								>
									{opt.label || opt}
								</option>
							))}
						</select>
					) : (
						<input
							id={field.name}
							type={field.type || "text"}
							name={field.name}
							value={values[field.name]}
							onChange={handleChange}
							placeholder={field.placeholder || ""}
						/>
					)}
				</div>
			))}

			<button type="submit" className="submit-btn">
				{submitLabel || "Valider"}
			</button>
		</form>
	);
}

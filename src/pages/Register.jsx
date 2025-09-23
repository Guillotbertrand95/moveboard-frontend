import { useState } from "react";
import api from "../api/apiService";
import { useNavigate } from "react-router-dom";
import "../styles/Register.scss";

export default function Register() {
	const [form, setForm] = useState({ username: "", email: "", password: "" });
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post("/auth/register", form);
			localStorage.setItem("token", res.data.token);
			navigate("/dashboard");
		} catch (err) {
			setError(err.response?.data?.msg || "Erreur serveur");
		}
	};

	return (
		<div className="register-page">
			<h1>Inscription</h1>
			<form onSubmit={handleSubmit}>
				<input
					name="username"
					placeholder="Nom"
					onChange={handleChange}
				/>
				<input
					name="email"
					placeholder="Email"
					onChange={handleChange}
				/>
				<input
					name="password"
					placeholder="Mot de passe"
					type="password"
					onChange={handleChange}
				/>
				<button type="submit">S'enregistrer</button>
				{error && <p>{error}</p>}
			</form>
		</div>
	);
}

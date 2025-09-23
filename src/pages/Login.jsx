import { useState } from "react";
import api from "../api/apiService";
import { useNavigate } from "react-router-dom";
import "../styles/Login.scss";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post("/auth/login", { email, password });
			localStorage.setItem("token", res.data.token);
			navigate("/dashboard");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="login-page">
			<h1>Connexion</h1>
			<form onSubmit={handleLogin}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

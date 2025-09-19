import { useNavigate } from "react-router-dom";

export default function LandingPage() {
	const navigate = useNavigate();

	return (
		<div>
			<h1>Bienvenue sur MoveBoard</h1>
			<button onClick={() => navigate("/register")}>Inscription</button>
			<button onClick={() => navigate("/login")}>Connexion</button>
		</div>
	);
}

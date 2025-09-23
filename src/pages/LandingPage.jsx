import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.scss";

export default function LandingPage() {
	const navigate = useNavigate();

	return (
		<div className="landing-page">
			<h1>Bienvenue sur MoveBoard</h1>
			<div className="landing-buttons">
				<button onClick={() => navigate("/register")}>
					Inscription
				</button>
				<button onClick={() => navigate("/login")}>Connexion</button>
			</div>
		</div>
	);
}

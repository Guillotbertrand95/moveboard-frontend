import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.scss";

function Navbar() {
	const navigate = useNavigate();
	const isAuthenticated = !!localStorage.getItem("token"); // vrai si connecté

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="navbar">
			<h2 className="navbar__logo">Moveboard</h2>
			<ul className="navbar__links">
				<li>
					<Link to="/dashboard">Tableau de bord</Link>
				</li>
				<li>
					<Link to="/manager">Gestion</Link>
				</li>
				<li>
					<Link to="/office">Office</Link>
				</li>
				{isAuthenticated && (
					<li>
						<button onClick={handleLogout} className="logout-btn">
							Déconnexion
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
}

export default Navbar;

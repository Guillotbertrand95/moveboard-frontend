// src/components/Navbar.jsx
function Navbar() {
	return (
		<nav>
			<h2>Moveboard</h2>
			<ul>
				<li>
					<a href="/dashboard">Dashboard</a>
				</li>
				<li>
					<a href="/profile">Profil</a>
				</li>
				<li>
					<a href="/settings">Paramètres</a>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar; // <- obligatoire si tu veux l'importer comme "default"

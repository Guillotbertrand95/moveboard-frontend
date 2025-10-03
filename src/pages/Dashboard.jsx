import "../styles/Dashboard.scss";
import DashboardButton from "../components/DashboardButton";

export default function Dashboard() {
	return (
		<div className="dashboard-container">
			<div className="intro-dashboard">
				<h1>Espace Manager</h1>
				<p>
					Bienvenue ! Ici vous pouvez gérer les collaborateurs,
					fournisseurs, informations, etc.
				</p>

				<div className="dashboard-buttons">
					<DashboardButton
						label="📦 Gestion des stocks"
						path="/stock"
					/>
					<DashboardButton
						label="📅 Réservations"
						path="/reservations"
					/>
					<DashboardButton label="✅ Tâches" path="/tasks" />
					<DashboardButton label="📋 Menus" path="/menus" />
				</div>
			</div>
		</div>
	);
}

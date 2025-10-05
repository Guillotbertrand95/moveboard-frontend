import "../styles/Dashboard.scss";
import DashboardButton from "../components/DashboardButton";

export default function Dashboard() {
	return (
		<div className="dashboard-container">
			<div className="intro-dashboard">
				<h1>Tableau de bord</h1>
				<p>
					Bienvenue ! Ici vous pouvez gérer vos commandes, les
					différentes Tâches, les réservation et les menus.
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

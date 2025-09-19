import "../styles/Dashboard.scss";
import Navbar from "../components/Navbar";
import DashboardButton from "../components/DashboardButton";

export default function Dashboard() {
	return (
		<>
			<Navbar />
			<div className="dashboard-container">
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
				</div>
			</div>
		</>
	);
}

import { useNavigate } from "react-router-dom";

export default function DashboardButton({ label, path }) {
	const navigate = useNavigate();

	return (
		<button onClick={() => navigate(path)} className="dashboard-btn">
			{label}
		</button>
	);
}

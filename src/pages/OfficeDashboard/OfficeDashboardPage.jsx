import { useState, useEffect } from "react";
import CalendarView from "./CalendarView";
import DashboardFilter from "./DashboardFilter";
import DashboardTable from "./DashboardTable";
import Modal from "./ModalOffice";
import "../../styles/OfficeDashboardPage.scss";

export default function OfficeDashboardPage() {
	const [mainFilter, setMainFilter] = useState("taches"); // taches | stock | menu | reservations
	const [sectionFilter, setSectionFilter] = useState("all"); // all | cuisine | bar | service | plonge
	const [data, setData] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalData, setModalData] = useState([]);
	const [modalDate, setModalDate] = useState(null);

	const token = localStorage.getItem("token");
	const staffId = localStorage.getItem("userId"); // récupère l’ID du collaborateur

	// fetch général pour le tableau (sans date obligatoire)
	useEffect(() => {
		const fetchData = async () => {
			try {
				let endpoint;
				switch (mainFilter) {
					case "taches":
						endpoint = "/api/tasks/all"; // endpoint général pour toutes les tâches
						break;
					case "stock":
						endpoint = "/api/stock";
						break;
					case "menu":
						endpoint = "/api/menu";
						break;
					case "reservations":
						endpoint = "/api/reservations";
						break;
					default:
						endpoint = "/api/tasks/all";
				}

				const url = `http://localhost:5000${endpoint}`;

				const response = await fetch(url, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					console.error(
						"Erreur fetch:",
						response.status,
						response.statusText
					);
					setData([]);
					return;
				}

				const json = await response.json();

				const filtered =
					sectionFilter === "all"
						? json
						: json.filter((item) => item.section === sectionFilter);

				setData(filtered);
			} catch (error) {
				console.error("Erreur de chargement :", error);
				setData([]);
			}
		};

		fetchData();
	}, [mainFilter, sectionFilter, token]);

	// fetch spécifique pour le modal (date + optionnel staff)
	const handleDateClick = (info) => {
		const clickedDate = info.dateStr;
		setModalDate(clickedDate);

		let endpoint = `/api/tasks?date=${clickedDate}`;
		if (staffId) endpoint += `&staffId=${staffId}`; // filtre collaborateur si besoin

		fetch(`http://localhost:5000${endpoint}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((json) => {
				const filtered =
					sectionFilter === "all"
						? json
						: json.filter((item) => item.section === sectionFilter);
				setModalData(filtered);
			})
			.catch((err) => {
				console.error("Erreur chargement modal :", err);
				setModalData([]);
			});

		setModalOpen(true);
	};

	return (
		<div className="office-dashboard">
			<h1>Espace Office</h1>

			<DashboardFilter
				mainFilter={mainFilter}
				setMainFilter={setMainFilter}
				sectionFilter={sectionFilter}
				setSectionFilter={setSectionFilter}
			/>

			<CalendarView data={data} onDateClick={handleDateClick} />

			<DashboardTable data={data} filter={mainFilter} />

			<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
				<h3>Données du {modalDate}</h3>
				{modalData.length === 0 ? (
					<p>Aucun élément pour cette date.</p>
				) : (
					<ul>
						{modalData.map((item, idx) => (
							<li key={idx}>
								{mainFilter === "taches" &&
									`${item.title} (${item.status})`}
								{mainFilter === "stock" &&
									`${item.name} : ${item.quantity}`}
								{mainFilter === "menu" && item.title}
								{mainFilter === "reservations" &&
									`${item.customerName} (${item.guests} invités)`}
							</li>
						))}
					</ul>
				)}
			</Modal>
		</div>
	);
}

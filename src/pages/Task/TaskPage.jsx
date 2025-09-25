import { useEffect, useState } from "react";
import { fetchStaffMembers } from "../../api/apiService";
import TaskManager from "./TaskManager";

export default function TaskPage() {
	const [staffList, setStaffList] = useState([]);
	const [selectedStaff, setSelectedStaff] = useState("");
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().slice(0, 10)
	);

	useEffect(() => {
		fetchStaffMembers().then(setStaffList);
	}, []);

	return (
		<div className="task-page">
			<h1>Gestion des Tâches</h1>
			<div className="task-filters">
				<select
					value={selectedStaff}
					onChange={(e) => setSelectedStaff(e.target.value)}
				>
					<option value="">-- choisir un collaborateur --</option>
					{staffList.map((staff) => (
						<option key={staff._id} value={staff._id}>
							{staff.firstname} {staff.name} ({staff.role})
						</option>
					))}
				</select>

				<input
					type="date"
					value={selectedDate}
					onChange={(e) => setSelectedDate(e.target.value)}
				/>
			</div>

			{selectedStaff && selectedDate && (
				<TaskManager staffId={selectedStaff} date={selectedDate} />
			)}
		</div>
	);
}

import { useEffect, useState } from "react";
import { fetchStaffMembers } from "../../api/apiService";
import TaskManager from "./TaskManager";
import ModalButton from "../../components/ModalButton";
import "../../styles/TaskPage.scss";

export default function TaskPage() {
	const [staffList, setStaffList] = useState([]);
	const [selectedStaff, setSelectedStaff] = useState("");
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().slice(0, 10)
	);

	// états pour afficher les pickers
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showStaffPicker, setShowStaffPicker] = useState(false);

	useEffect(() => {
		fetchStaffMembers().then(setStaffList);
	}, []);

	return (
		<div className="task-page">
			<h1>Gestion des Tâches</h1>

			<div className="task-filters">
				{/* Bouton pour choisir la date */}
				<ModalButton
					label={`📅 Date : ${selectedDate}`}
					onClick={() => setShowDatePicker((prev) => !prev)}
				/>

				{/* Bouton pour choisir le collaborateur */}
				<ModalButton
					label={`👤 Collaborateur : ${
						selectedStaff
							? staffList.find((s) => s._id === selectedStaff)
									?.firstname
							: "-- choisir --"
					}`}
					onClick={() => setShowStaffPicker((prev) => !prev)}
				/>
			</div>

			{/* Sélecteur Date */}
			{showDatePicker && (
				<div className="picker">
					<input
						type="date"
						value={selectedDate}
						onChange={(e) => {
							setSelectedDate(e.target.value);
							setShowDatePicker(false);
						}}
					/>
				</div>
			)}

			{/* Sélecteur Collaborateur */}
			{showStaffPicker && (
				<div className="picker">
					<select
						value={selectedStaff}
						onChange={(e) => {
							setSelectedStaff(e.target.value);
							setShowStaffPicker(false);
						}}
					>
						<option value="">-- choisir --</option>
						{staffList.map((staff) => (
							<option key={staff._id} value={staff._id}>
								{staff.firstname} {staff.name} ({staff.role})
							</option>
						))}
					</select>
				</div>
			)}

			{/* Partie principale */}
			{selectedStaff && selectedDate && (
				<TaskManager staffId={selectedStaff} date={selectedDate} />
			)}
		</div>
	);
}

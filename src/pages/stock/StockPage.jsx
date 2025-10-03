import { useEffect, useState } from "react";
import { fetchStockByStaffAndDate } from "./StockService";
import StockManager from "./StockManager";
import ModalButton from "../../components/ModalButton";
import "../../styles/StockPage.scss";

export default function StockPage() {
	const [staffList, setStaffList] = useState([]);
	const [selectedStaff, setSelectedStaff] = useState("");
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().slice(0, 10)
	);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showStaffPicker, setShowStaffPicker] = useState(false);

	useEffect(() => {
		import("../../api/apiService").then(({ fetchStaffMembers }) => {
			fetchStaffMembers().then(setStaffList);
		});
	}, []);

	return (
		<div className="stock-page">
			<h1>Gestion du Stock</h1>

			<div className="stock-filters">
				<ModalButton
					label={`📅 Date : ${selectedDate}`}
					onClick={() => setShowDatePicker((prev) => !prev)}
				/>
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

			{showDatePicker && (
				<div className="picker">
					<input
						type="date"
						value={selectedDate}
						onChange={(e) => setSelectedDate(e.target.value)}
					/>
				</div>
			)}

			{showStaffPicker && (
				<div className="picker">
					<select
						value={selectedStaff}
						onChange={(e) => setSelectedStaff(e.target.value)}
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

			{selectedStaff && selectedDate && (
				<StockManager staffId={selectedStaff} date={selectedDate} />
			)}
		</div>
	);
}

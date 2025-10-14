import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // ✅ à ajouter

export default function CalendarView({ data, onDateClick }) {
	const events = data.map((item) => ({
		title: item.name || item.title,
		date: item.date || item.createdAt,
	}));

	return (
		<div className="calendar-view">
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin]} // ✅ interaction activé
				initialView="dayGridMonth"
				events={events}
				height="auto"
				dateClick={onDateClick} // ✅ maintenant ça marche
			/>
		</div>
	);
}

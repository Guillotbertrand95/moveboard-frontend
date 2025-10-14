export default function DashboardFilter({
	mainFilter,
	setMainFilter,
	sectionFilter,
	setSectionFilter,
}) {
	return (
		<div className="dashboard-filters">
			<select
				value={mainFilter}
				onChange={(e) => setMainFilter(e.target.value)}
			>
				<option value="taches">Tâches</option>
				<option value="stock">Stock</option>
				<option value="menu">Menu</option>
				<option value="reservations">Réservations</option>
			</select>

			<select
				value={sectionFilter}
				onChange={(e) => setSectionFilter(e.target.value)}
			>
				<option value="all">Toutes les sections</option>
				<option value="cuisine">Cuisine</option>
				<option value="bar">Bar</option>
				<option value="service">Service</option>
				<option value="plonge">Plonge</option>
			</select>
		</div>
	);
}

export default function DashboardTable({ data, filter }) {
	return (
		<table className="dashboard-table">
			<thead>
				<tr>
					{filter === "taches" && (
						<>
							<th>Nom</th>
							<th>Statut</th>
						</>
					)}
					{filter === "stock" && (
						<>
							<th>Nom</th>
							<th>Quantité</th>
						</>
					)}
					{filter === "menu" && <th>Titre</th>}
					{filter === "reservations" && (
						<>
							<th>Client</th>
							<th>Invités</th>
						</>
					)}
				</tr>
			</thead>
			<tbody>
				{data.map((item, idx) => (
					<tr key={idx}>
						{filter === "taches" && (
							<>
								<td>{item.name}</td>
								<td>{item.status}</td>
							</>
						)}
						{filter === "stock" && (
							<>
								<td>{item.name}</td>
								<td>{item.quantity}</td>
							</>
						)}
						{filter === "menu" && <td>{item.title}</td>}
						{filter === "reservations" && (
							<>
								<td>{item.customerName}</td>
								<td>{item.guests}</td>
							</>
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
}

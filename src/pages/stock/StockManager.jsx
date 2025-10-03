import { useEffect, useState } from "react";
import {
	fetchStockByStaffAndDate,
	addStock,
	updateStock,
	deleteStock,
} from "./StockService";
import "../../styles/StockManager.scss";

export default function StockManager({ staffId, date }) {
	const [stockItems, setStockItems] = useState([]);
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		supplier: "",
	});
	const [supplierList, setSupplierList] = useState([]);

	// Charger les stocks
	const loadStock = async () => {
		if (!staffId || !date) return;
		const data = await fetchStockByStaffAndDate(staffId, date);
		setStockItems(data);
	};

	// Charger les fournisseurs
	useEffect(() => {
		import("../../api/apiService").then(({ fetchSuppliers }) => {
			fetchSuppliers().then(setSupplierList);
		});
	}, []);

	useEffect(() => {
		loadStock();
	}, [staffId, date]);

	const handleAddStock = async () => {
		if (!formData.title || !formData.supplier) return;
		await addStock({ ...formData, staffId, date });
		setFormData({ title: "", content: "", supplier: "" });
		loadStock();
	};

	const handleUpdateStock = async (id, updatedData) => {
		await updateStock(id, updatedData);
		loadStock();
	};

	const handleDeleteStock = async (id) => {
		await deleteStock(id);
		loadStock();
	};

	return (
		<div className="stock-manager">
			<div className="stock-form">
				<h3>Nouvelle commande</h3>
				<input
					type="text"
					placeholder="Titre de la commande"
					value={formData.title}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							title: e.target.value,
						}))
					}
				/>
				<textarea
					placeholder="Contenu / Description"
					value={formData.content}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							content: e.target.value,
						}))
					}
				/>
				<select
					value={formData.supplier}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							supplier: e.target.value,
						}))
					}
				>
					<option value="">-- choisir un fournisseur --</option>
					{supplierList.map((s) => (
						<option key={s._id} value={s._id}>
							{s.name}
						</option>
					))}
				</select>
				<button onClick={handleAddStock}>Ajouter</button>
			</div>

			<div className="stock-list">
				<h3>Commandes existantes</h3>
				{stockItems.map((item) => (
					<div key={item._id} className="stock-card">
						<h4>{item.title}</h4>
						<p>{item.content}</p>
						<p>Fournisseur: {item.supplier?.name || "—"}</p>
						<div className="stock-actions">
							<button onClick={() => handleDeleteStock(item._id)}>
								Supprimer
							</button>
							<button
								onClick={() =>
									handleUpdateStock(item._id, {
										status:
											item.status === "Disponible"
												? "En cours"
												: item.status === "En cours"
												? "Épuisé"
												: "Disponible",
									})
								}
							>
								Avancer
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

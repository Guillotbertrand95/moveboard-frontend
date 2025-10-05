import { useEffect, useState } from "react";
import { fetchStock, addStock, updateStock, deleteStock } from "./StockService";

import "../../styles/StockManager.scss";

export default function StockManager({ date, staffId }) {
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
		const data = await fetchStock(date, staffId); // <-- appel corrigé
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
	}, [date, staffId]);

	const handleAddStock = async () => {
		if (!formData.title || !formData.supplier) return;

		const stockData = {
			selectedStaffId: staffId, // <-- correspond au collaborateur choisi
			date: date, // vérifie que c'est une string ISO ou objet Date
			title: formData.title,
			content: formData.content,
			supplier: formData.supplier, // si tu veux stocker le fournisseur
		};

		try {
			await addStock(stockData);
			setFormData({ title: "", content: "", supplier: "" });
			loadStock();
		} catch (err) {
			console.error("Erreur ajout stock :", err.response?.data || err);
		}
	};

	// Supprimer un stock
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
						setFormData({ ...formData, title: e.target.value })
					}
				/>
				<textarea
					placeholder="Contenu / Description"
					value={formData.content}
					onChange={(e) =>
						setFormData({ ...formData, content: e.target.value })
					}
				/>
				<select
					value={formData.supplier}
					onChange={(e) =>
						setFormData({ ...formData, supplier: e.target.value })
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
						<p>Fournisseur: {item.supplier?.name || ""}</p>
						<p>
							Créé par: {item.createdBy?.username || ""} (
							{item.createdBy?._id || ""})
						</p>
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

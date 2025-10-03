// src/pages/Stock/StockService.js
import api from "../../api/apiService"; // ton axios configuré

// Récupérer les items de stock par collaborateur et date
export const fetchStockByStaffAndDate = async (staffId, date) => {
	const res = await api.get("/stock", {
		params: { staffId, date, t: new Date().getTime() },
	});
	return res.data;
};

// Ajouter une commande de stock
export const addStock = async (stockData) => {
	const res = await api.post("/stock", stockData);
	return res.data;
};

// Mettre à jour un item existant
export const updateStock = async (stockId, updatedData) => {
	const res = await api.put(`/stock/${stockId}`, updatedData);
	return res.data;
};

// Supprimer un item
export const deleteStock = async (stockId) => {
	const res = await api.delete(`/stock/${stockId}`);
	return res.data;
};

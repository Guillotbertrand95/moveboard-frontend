import api from "../../api/apiService"; // ton instance Axios

// Récupérer les commandes d'un collaborateur à une date
export const fetchStock = async (date, staffId) => {
	const res = await api.get("/stock", {
		params: { staffId, date, t: new Date().getTime() }, // t pour éviter le cache
	});
	return res.data;
};

// Ajouter une commande
export const addStock = async (stockData) => {
	const res = await api.post("/stock", stockData);
	return res.data;
};

// Mettre à jour une commande
export const updateStock = async (stockId, updatedData) => {
	const res = await api.put(`/stock/${stockId}`, updatedData);
	return res.data;
};

// Supprimer une commande
export const deleteStock = async (stockId) => {
	const res = await api.delete(`/stock/${stockId}`);
	return res.data;
};

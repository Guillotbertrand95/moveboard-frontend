import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5000/api",
});

// Interceptor pour ajouter le token à toutes les requêtes
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

// Collaborateurs
export const addStaffMember = async (staffData) => {
	const res = await api.post("/staff", staffData);
	return res.data;
};

// Fournisseurs (à adapter selon ton backend)
export const addSupplier = async (supplierData) => {
	const res = await api.post("/supplier", supplierData);
	return res.data;
};

// Informations générales (Info)
export const addInformation = async (infoData) => {
	const res = await api.post("/info", infoData);
	return res.data;
};

export default api;

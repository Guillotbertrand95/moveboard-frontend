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

// ------------------- Collaborateurs -------------------
export const fetchStaffMembers = async () => {
	const res = await api.get("/staff");
	return res.data;
};

export const addStaffMember = async (staffData) => {
	const res = await api.post("/staff", staffData);
	return res.data;
};

export const updateStaffMember = async (id, staffData) => {
	const res = await api.put(`/staff/${id}`, staffData);
	return res.data;
};

export const deleteStaffMember = async (id) => {
	const res = await api.delete(`/staff/${id}`);
	return res.data;
};

// ------------------- Fournisseurs -------------------
export const fetchSuppliers = async () => {
	const res = await api.get("/supplier");
	return res.data;
};

export const addSupplier = async (supplierData) => {
	const res = await api.post("/supplier", supplierData);
	return res.data;
};

export const updateSupplier = async (id, supplierData) => {
	const res = await api.put(`/supplier/${id}`, supplierData);
	return res.data;
};

export const deleteSupplier = async (id) => {
	const res = await api.delete(`/supplier/${id}`);
	return res.data;
};

// ------------------- Informations -------------------
export const fetchInformations = async () => {
	const res = await api.get("/info");
	return res.data;
};

export const addInformation = async (infoData) => {
	const res = await api.post("/info", infoData);
	return res.data;
};

export const updateInformation = async (id, infoData) => {
	const res = await api.put(`/info/${id}`, infoData);
	return res.data;
};

export const deleteInformation = async (id) => {
	const res = await api.delete(`/info/${id}`);
	return res.data;
};

export default api;

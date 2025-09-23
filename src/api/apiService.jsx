import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export default api;
const API_URL = "http://localhost:5000/api/staff"; // adapte si différent

export const addStaffMember = async (staffData, token) => {
	const res = await axios.post(API_URL, staffData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

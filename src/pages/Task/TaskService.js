// src/pages/Task/TaskService.js
import api from "../../api/apiService";

export const fetchTasksByStaffAndDate = async (staffId, date) => {
	const res = await api.get("/tasks", {
		params: {
			staffId,
			date,
			t: new Date().getTime(), // <- ajoute ce paramètre pour éviter le cache
		},
	});
	return res.data;
};

export const addTask = async (taskData) => {
	const res = await api.post("/tasks", taskData);
	return res.data;
};

export const updateTask = async (taskId, updatedData) => {
	const res = await api.put(`/tasks/${taskId}`, updatedData);
	return res.data;
};

export const deleteTask = async (taskId) => {
	const res = await api.delete(`/tasks/${taskId}`);
	return res.data;
};

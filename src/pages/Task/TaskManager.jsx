// src/components/TaskManager.jsx
import { useEffect, useState } from "react";
import GenericForm from "../../components/GenericForm";
import "../../styles/TaskManager.scss";
import {
	fetchTasksByStaffAndDate,
	addTask,
	updateTask,
	deleteTask,
} from "./TaskService.js";
import { useMemo } from "react";
export default function TaskManager({ staffId, date }) {
	const [tasks, setTasks] = useState([]);

	// On charge les tâches quand staffId ou date change
	useEffect(() => {
		if (!staffId || !date) return;

		fetchTasksByStaffAndDate(staffId, date)
			.then((data) => setTasks(data || []))
			.catch(console.error);
	}, [staffId, date]);

	const handleAddTask = (data) => {
		addTask({ ...data, staffId, date }).then((newTask) =>
			setTasks((prev) => [...prev, newTask])
		);
	};

	const handleDeleteTask = (taskId) => {
		deleteTask(taskId).then(() =>
			setTasks((prev) => prev.filter((t) => t._id !== taskId))
		);
	};

	const handleUpdateTask = (taskId, updatedData) => {
		updateTask(taskId, updatedData).then((updatedTask) => {
			setTasks((prev) =>
				prev.map((t) => (t._id === taskId ? updatedTask : t))
			);
		});
	};
	// dans TaskManager
	const taskFormFields = useMemo(
		() => [
			{ name: "title", label: "Titre" },
			{ name: "description", label: "Description", type: "textarea" },
			{
				name: "status",
				label: "Statut",
				type: "select",
				options: ["À faire", "En cours", "Terminé"],
			},
		],
		[]
	);
	return (
		<div className="task-manager">
			<div className="kanban-columns">
				{["À faire", "En cours", "Terminé"].map((status) => (
					<div key={status} className="kanban-column">
						<h3>{status}</h3>
						{tasks
							.filter((task) => task.status === status)
							.map((task) => (
								<div key={task._id} className="task-card">
									<p>{task.title}</p>
									<p>{task.description}</p>
									<div className="task-actions">
										<button
											onClick={() =>
												handleDeleteTask(task._id)
											}
										>
											Supprimer
										</button>
										<button
											onClick={() =>
												handleUpdateTask(task._id, {
													status:
														status === "À faire"
															? "En cours"
															: status ===
															  "En cours"
															? "Terminé"
															: "À faire",
												})
											}
										>
											Avancer
										</button>
									</div>
								</div>
							))}
					</div>
				))}
			</div>

			<div className="task-add-form">
				<h3>Ajouter une tâche / commentaire</h3>
				<GenericForm
					fields={taskFormFields}
					onSubmit={handleAddTask}
					submitLabel="Ajouter"
				/>
			</div>
		</div>
	);
}

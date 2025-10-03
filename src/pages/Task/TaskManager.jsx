import { useEffect, useState, useMemo } from "react";
import GenericForm from "../../components/GenericForm";
import "../../styles/TaskManager.scss";
import {
	fetchTasksByStaffAndDate,
	addTask,
	updateTask,
	deleteTask,
} from "./TaskService.js";

export default function TaskManager({ staffId, date }) {
	const [tasks, setTasks] = useState([]);
	const [formKey, setFormKey] = useState(0); // Pour reset du formulaire

	// On charge les tâches quand staffId ou date change
	useEffect(() => {
		if (!staffId) return;

		fetchTasksByStaffAndDate(staffId, date)
			.then((data) => setTasks(data || []))
			.catch(console.error);
	}, [staffId, date]);

	const handleAddTask = (data) => {
		const { title, description, status } = data;
		if (!title || !description || !status) {
			alert("⚠️ Veuillez remplir tous les champs.");
			return;
		}

		addTask({ ...data, staffId, date })
			.then((newTask) => {
				setTasks((prev) => [...prev, newTask]);
				setFormKey((prev) => prev + 1); // reset GenericForm
			})
			.catch((err) => {
				console.error(err);
				alert("Erreur lors de l'ajout de la tâche.");
			});
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
					key={formKey} // <- reset automatique après submit
					fields={taskFormFields}
					onSubmit={handleAddTask}
					submitLabel="Ajouter"
				/>
			</div>
		</div>
	);
}

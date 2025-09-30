import { useState, useEffect } from "react";
import Modal from "./Modal";
import GenericForm from "./GenericForm";
import "../styles/EntityManagerModal.scss";
export default function EntityManagerModal({
	title,
	fields,
	fetchItems,
	onAdd,
	onUpdate,
	onDelete,
	onClose,
}) {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [formModal, setFormModal] = useState(null);
	// { mode: "add" | "edit", data: {} }

	// Charger les données au montage
	useEffect(() => {
		loadItems();
	}, []);

	async function loadItems() {
		try {
			setLoading(true);
			const data = await fetchItems();
			setItems(data);
		} catch (err) {
			console.error("Erreur chargement items :", err);
		} finally {
			setLoading(false);
		}
	}

	async function handleSubmit(data) {
		try {
			if (formModal.mode === "add") {
				await onAdd(data);
			} else if (formModal.mode === "edit") {
				await onUpdate(formModal.data._id || formModal.data.id, data);
			}
			await loadItems(); // rafraîchir la liste
			setFormModal(null); // fermer la modale formulaire
		} catch (err) {
			console.error("Erreur soumission :", err);
			alert("Impossible d’enregistrer");
		}
	}

	async function handleDelete(id) {
		if (!window.confirm("Supprimer cet élément ?")) return;
		try {
			await onDelete(id);
			await loadItems();
		} catch (err) {
			console.error("Erreur suppression :", err);
			alert("Impossible de supprimer");
		}
	}

	return (
		<Modal onClose={onClose}>
			<h2>Gestion des {title}</h2>

			{loading ? (
				<p>Chargement...</p>
			) : (
				<>
					{items.length === 0 ? (
						<p>Aucun {title.toLowerCase()} pour l’instant.</p>
					) : (
						<ul className="entity-list">
							{items.map((item) => (
								<li
									className="entity-item"
									key={item._id || item.id}
								>
									<span>
										{item.name || item.title || "Sans nom"}
									</span>
									<div className="btnGestion">
										<button
											onClick={() =>
												setFormModal({
													mode: "edit",
													data: item,
												})
											}
										>
											Modifier
										</button>
										<button
											onClick={() =>
												handleDelete(
													item._id || item.id
												)
											}
										>
											Supprimer
										</button>
									</div>
								</li>
							))}
						</ul>
					)}
				</>
			)}

			<button onClick={() => setFormModal({ mode: "add", data: {} })}>
				➕ Ajouter
			</button>

			{/* Seconde modale pour ajouter/modifier */}
			{formModal && (
				<Modal onClose={() => setFormModal(null)}>
					<h3>
						{formModal.mode === "add" ? "Ajouter" : "Modifier"}{" "}
						{title}
					</h3>
					<GenericForm
						fields={fields}
						onSubmit={handleSubmit}
						initialData={formModal.data}
						submitLabel={
							formModal.mode === "add"
								? "Ajouter"
								: "Mettre à jour"
						}
					/>
				</Modal>
			)}
		</Modal>
	);
}

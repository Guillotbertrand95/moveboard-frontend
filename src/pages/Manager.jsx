// pages/Manager.jsx
import { useState } from "react";
import "../styles/Manager.scss";
import Modal from "../components/Modal";
import ModalButton from "../components/ModalButton";
import GenericForm from "../components/GenericForm";
import { addStaffMember, addSupplier, addInformation } from "../api/apiService";

export default function Manager() {
	const [openModal, setOpenModal] = useState(null); // 'collaborator', 'supplier', 'information', null
	const token = localStorage.getItem("token"); // récupère le token JWT

	// Champs pour GenericForm
	const collaboratorFields = [
		{ name: "name", label: "Nom" },
		{ name: "firstname", label: "Prénom" },
		{ name: "section", label: "Section" },
		{ name: "role", label: "Rôle" },
		{ name: "telephone", label: "Téléphone" },
		{ name: "email", label: "Email", type: "email" },
	];

	const supplierFields = [
		{ name: "name", label: "Nom du fournisseur" },
		{ name: "email", label: "Email", type: "email" },
		{ name: "phone", label: "Téléphone" },
	];

	const informationFields = [
		{ name: "title", label: "Titre" },
		{ name: "email", label: "Email", type: "email" },
		{ name: "phone", label: "Téléphone" },
		{ name: "address", label: "Adresse" },
		{ name: "hour", label: "Heure" },
		{ name: "content", label: "Contenu", type: "textarea" },
	];

	async function handleAddInformation(data) {
		try {
			// Appelle une fonction API pour ajouter des informations (à créer)
			console.log("💡 Données envoyées au backend :", data); // <--- check ici
			await addInformation(data);
			console.log("Informations ajoutées !");
			setOpenModal(null);
		} catch (err) {
			console.error(err);
			alert("Erreur lors de l'ajout des informations");
		}
	}

	async function handleAddCollaborator(data) {
		try {
			console.log("💡 Données envoyées au backend :", data); // <--- check ici
			await addStaffMember(data); // token injecté automatiquement
			console.log("Collaborateur ajouté !");
			setOpenModal(null); // fermer la modale
			// ici tu peux rafraîchir la liste ou afficher un message
		} catch (err) {
			console.error(err);
			alert("Erreur lors de l'ajout du collaborateur");
		}
	}

	async function handleAddSupplier(data) {
		try {
			await addSupplier(data);
			console.log("Fournisseur ajouté !");
			setOpenModal(null);
		} catch (err) {
			console.error(err);
			alert("Erreur lors de l'ajout du fournisseur");
		}
	}

	return (
		<div className="manager">
			<div className="intro-manager">
				<h1>Espace Manager</h1>
				<p>
					Bienvenue ! Ici vous pouvez gérer les collaborateurs,
					fournisseurs, etc.
				</p>
			</div>

			<div className="action-manager">
				{/* Boutons pour ouvrir les modales */}
				<ModalButton
					onClick={() => setOpenModal("collaborator")}
					label="Ajouter un collaborateur"
				/>
				<ModalButton
					onClick={() => setOpenModal("supplier")}
					label="Ajouter un fournisseur"
				/>
				<ModalButton
					onClick={() => setOpenModal("information")}
					label="Ajouter des informations"
				/>

				{/* Modale Collaborateur */}
				{openModal === "collaborator" && (
					<Modal onClose={() => setOpenModal(null)}>
						<h2>Ajouter un collaborateur</h2>
						<GenericForm
							fields={collaboratorFields}
							onSubmit={handleAddCollaborator}
							submitLabel="Ajouter le collaborateur"
						/>
					</Modal>
				)}

				{/* Modale Fournisseur */}
				{openModal === "supplier" && (
					<Modal onClose={() => setOpenModal(null)}>
						<h2>Ajouter un fournisseur</h2>
						<GenericForm
							fields={supplierFields}
							onSubmit={handleAddSupplier}
							submitLabel="Ajouter le fournisseur"
						/>
					</Modal>
				)}

				{/* Modale Information */}
				{openModal === "information" && (
					<Modal onClose={() => setOpenModal(null)}>
						<h2>Ajouter des informations</h2>
						<GenericForm
							fields={informationFields}
							onSubmit={handleAddInformation}
							submitLabel="Ajouter les informations"
						/>
					</Modal>
				)}
			</div>
		</div>
	);
}

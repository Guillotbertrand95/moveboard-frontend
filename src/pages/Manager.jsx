// pages/Manager.jsx
import { useState } from "react";
import "../styles/Manager.scss";
import Modal from "../components/Modal";
import ModalButton from "../components/ModalButton";
import GenericForm from "../components/GenericForm";

export default function Manager() {
	// État pour savoir quelle modale est ouverte
	const [openModal, setOpenModal] = useState(null); // 'collaborator', 'supplier', 'information'

	// Champs pour collaborateur
	const collaboratorFields = [
		{ name: "name", label: "Nom du collaborateur" },
		{ name: "firstname", label: "Prénom du collaborateur" },
		{ name: "section", label: "Section" },
		{ name: "role", label: "Rôle" },
		{ name: "telephone", label: "Téléphone" },
		{ name: "email", label: "Email", type: "email" },
	];

	// Fonction soumission collaborateur
	const handleAddCollaborator = (data) => {
		console.log("Ajouter collaborateur :", data);
		setOpenModal(null); // fermer la modale après soumission
	};

	// Champs pour fournisseur
	const supplierFields = [
		{ name: "name", label: "Nom du fournisseur" },
		{ name: "email", label: "Email", type: "email" },
		{ name: "phone", label: "Téléphone" },
	];

	// Fonction soumission fournisseur
	const handleAddSupplier = (data) => {
		console.log("Ajouter fournisseur :", data);
		setOpenModal(null);
	};

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

				{/* Modale Informations */}
				{openModal === "information" && (
					<Modal onClose={() => setOpenModal(null)}>
						<h2>Ajouter des informations</h2>
						{/* Ici tu pourras mettre un GenericForm ou autre contenu */}
					</Modal>
				)}
			</div>
		</div>
	);
}

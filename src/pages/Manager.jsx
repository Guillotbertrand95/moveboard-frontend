import { useState } from "react";
import "../styles/Manager.scss";
import ModalButton from "../components/ModalButton";
import EntityManagerModal from "../components/EntityManagerModal";
import {
	fetchStaffMembers,
	addStaffMember,
	updateStaffMember,
	deleteStaffMember,
	fetchSuppliers,
	addSupplier,
	updateSupplier,
	deleteSupplier,
	fetchInformations,
	addInformation,
	updateInformation,
	deleteInformation,
} from "../api/apiService";

export default function Manager() {
	const [openModal, setOpenModal] = useState(null); // 'collaborator', 'supplier', 'information', null

	// Champs pour GenericForm
	const collaboratorFields = [
		{ name: "name", label: "Nom" },
		{ name: "firstname", label: "Prénom" },
		{
			name: "section",
			label: "Section",
			type: "select",
			options: [
				{ value: "cuisine", label: "Cuisine" },
				{ value: "bar", label: "Bar" },
				{ value: "service", label: "Service" },
				{ value: "plonge", label: "Plonge" },
			],
		},
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

	return (
		<div className="manager">
			<div className="intro-manager">
				<h1>Espace Manager</h1>
				<p>
					Bienvenue ! Ici vous pouvez gérer les collaborateurs,
					fournisseurs, informations, etc.
				</p>
			</div>

			<div className="action-manager">
				{/* Boutons pour ouvrir les modales */}
				<ModalButton
					onClick={() => setOpenModal("collaborator")}
					label="Gérer les collaborateurs"
				/>
				{openModal === "collaborator" && (
					<EntityManagerModal
						title="Collaborateurs"
						fields={collaboratorFields}
						fetchItems={fetchStaffMembers}
						onAdd={addStaffMember}
						onUpdate={updateStaffMember}
						onDelete={deleteStaffMember}
						onClose={() => setOpenModal(null)}
					/>
				)}

				<ModalButton
					onClick={() => setOpenModal("supplier")}
					label="Gérer les fournisseurs"
				/>
				{openModal === "supplier" && (
					<EntityManagerModal
						title="Fournisseurs"
						fields={supplierFields}
						fetchItems={fetchSuppliers}
						onAdd={addSupplier}
						onUpdate={updateSupplier}
						onDelete={deleteSupplier}
						onClose={() => setOpenModal(null)}
					/>
				)}

				<ModalButton
					onClick={() => setOpenModal("information")}
					label="Gérer les informations"
				/>
				{openModal === "information" && (
					<EntityManagerModal
						title="Informations"
						fields={informationFields}
						fetchItems={fetchInformations}
						onAdd={addInformation}
						onUpdate={updateInformation}
						onDelete={deleteInformation}
						onClose={() => setOpenModal(null)}
					/>
				)}
			</div>
		</div>
	);
}

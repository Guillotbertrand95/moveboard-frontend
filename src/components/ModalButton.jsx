import React from "react";
import "../styles/ModalButton.scss";

export default function ModalButton({ label, onClick, className }) {
	return (
		<button className={`modal-btn ${className || ""}`} onClick={onClick}>
			{label}
		</button>
	);
}

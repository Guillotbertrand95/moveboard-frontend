// src/components/Loading.jsx
import "../styles/Loading.scss";

export default function Loading() {
	return (
		<div className="loading-container">
			<div className="spinner"></div>
			<p>Chargement...</p>
		</div>
	);
}

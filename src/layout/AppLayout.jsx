import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
	return (
		<>
			<Navbar />
			<main>
				<Outlet /> {/* Ici s’affiche le contenu de chaque page */}
			</main>
		</>
	);
}

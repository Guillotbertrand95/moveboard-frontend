// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import Reservations from "./pages/Reservations";
import Tasks from "./pages/Tasks";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Dashboard />} />
					<Route path="/stock" element={<Stock />} />
					<Route path="/reservations" element={<Reservations />} />
					<Route path="/tasks" element={<Tasks />} />
				</Route>
			</Routes>
		</Router>
	);
}

// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/AppLayout";
import PrivateRoute from "./components/PrivateRoute";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import Reservations from "./pages/Reservations";
import Tasks from "./pages/Tasks";

import Manager from "./pages/Manager";
import Office from "./pages/Office";
export default function App() {
	return (
		<Router>
			<Routes>
				{/* Routes publiques */}
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				{/* Routes privées */}
				<Route
					element={
						<PrivateRoute>
							<Layout />
						</PrivateRoute>
					}
				>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/stock" element={<Stock />} />
					<Route path="/reservations" element={<Reservations />} />
					<Route path="/tasks" element={<Tasks />} />
					<Route path="/manager" element={<Manager />} />
					<Route path="/office" element={<Office />} />
				</Route>
			</Routes>
		</Router>
	);
}

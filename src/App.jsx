// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./layout/AppLayout";
import PrivateRoute from "./components/PrivateRoute";

// Fallback loader
import Loading from "./components/Loading"; // à créer si pas déjà fait

// Pages en lazy
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const StockPage = lazy(() => import("./pages/stock/StockPage"));
const Reservations = lazy(() => import("./pages/Reservations"));
const TaskPage = lazy(() => import("./pages/Task/TaskPage"));
const Manager = lazy(() => import("./pages/Manager"));
const OfficeDashboardPage = lazy(() =>
	import("./pages/OfficeDashboard/OfficeDashboardPage")
);

export default function App() {
	return (
		<Router>
			<Suspense fallback={<Loading />}>
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
						<Route path="/stock" element={<StockPage />} />
						<Route
							path="/reservations"
							element={<Reservations />}
						/>
						<Route path="/tasks" element={<TaskPage />} />
						<Route path="/manager" element={<Manager />} />
						<Route
							path="/office"
							element={<OfficeDashboardPage />}
						/>
					</Route>
				</Routes>
			</Suspense>
		</Router>
	);
}

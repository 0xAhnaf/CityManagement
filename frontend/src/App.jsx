import "./App.css";
import Navbar from "./NavBar/Navbar";
import Home from "./Pages/Home";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import ReportPage from "./Pages/ReportPage/ReportPage";
import VolunteerPage from "./Pages/Volunteers/VolunteerPage";
import BloodDonation from "./Pages/BloodDonation/BloodDonation";
import Login from "./Pages/Login/login";
import Signup from "./Pages/SignUp/signUp";
import CitizenDashboard from "./CitizenDashboard/CitizenDashboard";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { Toaster } from "react-hot-toast";
import AdminPanel from "./Pages/Admin/AdminPanel";
import { useAuthContext } from "./contexts/AuthContext";

function AdminRoute() {
  const { user } = useAuthContext();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;
  return <Outlet />;
}

function App() {
  const { user } = useAuthContext();
  const location = useLocation();
  const hideNavbar = ["/login", "/signup", "/admin"].includes(
    location.pathname,
  );

  return (
    <main className="main-content">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={user?.role === "admin" ? <Navigate to="/admin" /> : <Home />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="/ReportPage" element={<ReportPage />} />
          <Route path="/BloodDonation" element={<BloodDonation />} />
          <Route path="/VolunteerPage" element={<VolunteerPage />} />
          <Route path="/dashboard" element={<CitizenDashboard />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
      <Toaster position="bottom-right" />
    </main>
  );
}

export default App;
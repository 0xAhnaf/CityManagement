import "./App.css";
import Navbar from "./NavBar/Navbar";
import Home from "./Pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import ReportPage from "./Pages/ReportPage/ReportPage";
import VolunteerPage from "./Pages/Volunteers/VolunteerPage";
import VolunteerForm from "./Pages/Volunteers/VolunteerForm";
import BloodDonation from "./Pages/BloodDonation/BloodDonation";
import Login from "./Pages/Login/login";
import Signup from "./Pages/SignUp/signUp";
import CitizenDashboard from "./CitizenDashboard/CitizenDashboard";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { Toaster } from "react-hot-toast";
import CreateEvent from "./Pages/Volunteers/CreateEvent";
import Admin from "./Pages/Admin/Admin";
import AdminRoute from "./utils/AdminRoute";

function App() {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <main className="main-content">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/ReportPage" element={<ReportPage />} />
          <Route path="/BloodDonation" element={<BloodDonation />} />
          <Route path="/VolunteerPage" element={<VolunteerPage />} />
          <Route path="/VolunteerForm/:eventId" element={<VolunteerForm />} />
          <Route path="/dashboard" element={<CitizenDashboard />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route element={<AdminRoute/>}>
            <Route path="/admin" element={<Admin />} />
          </Route>
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

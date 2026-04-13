import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import ReceptionDashboard from "./pages/ReceptionDashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Beds from "./pages/Beds";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/patients"
          element={
            <ProtectedRoute allowedRole="admin">
              <Layout>
                <Patients />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute allowedRole="admin">
              <Layout>
                <Doctors />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute allowedRole="admin">
              <Layout>
                <Appointments />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/beds"
          element={
            <ProtectedRoute allowedRole="admin">
              <Layout>
                <Beds />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ================= DOCTOR ROUTES ================= */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRole="doctor">
              <Layout>
                <DoctorDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute allowedRole="doctor">
              <Layout>
                <Patients />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute allowedRole="doctor">
              <Layout>
                <Appointments />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ================= RECEPTION ROUTES ================= */}
        <Route
          path="/reception"
          element={
            <ProtectedRoute allowedRole="reception">
              <Layout>
                <ReceptionDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reception/patients"
          element={
            <ProtectedRoute allowedRole="reception">
              <Layout>
                <Patients />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reception/appointments"
          element={
            <ProtectedRoute allowedRole="reception">
              <Layout>
                <Appointments />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reception/beds"
          element={
            <ProtectedRoute allowedRole="reception">
              <Layout>
                <Beds />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
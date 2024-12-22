import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import DoctorDashboard from "../pages/doctor/Dashboard.jsx";
import PatientManagement from "../pages/doctor/PatientManagement.jsx";
import Appointments from "../pages/doctor/Appointments.jsx";
import Queries from "../pages/doctor/Queries.jsx";
import Settings from "../pages/doctor/Settings.jsx";
import PatientDashboard from "../pages/patient/Dashboard.jsx";
import PatientAppointments from "../pages/patient/Appointments.jsx";
import PatientConsultations from "../pages/patient/Consultations.jsx";
import PatientMessages from "../pages/patient/Messages.jsx";
import PatientProfile from "../pages/patient/Profile.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PatientSettings from "../pages/patient/Settings.jsx";

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    
    {
      path: "/doctor",
      element: <ProtectedRoute role="doctor" />,
      children: [
        { index: true, element: <DoctorDashboard /> },
        { path: "dashboard", element: <DoctorDashboard /> },
        { path: "patients", element: <PatientManagement /> },
        { path: "appointments", element: <Appointments /> },
        { path: "queries", element: <Queries /> },
        { path: "settings", element: <Settings /> },
      ],
    },
    {
      path: "/patient",
      element: <ProtectedRoute role="patient" />,
      children: [
        { index: true, element: <PatientDashboard /> },
        { path: "dashboard", element: <PatientDashboard /> },
        { path: "appointments", element: <PatientAppointments /> },
        { path: "consultations", element: <PatientConsultations /> },
        { path: "messages", element: <PatientMessages /> },
        { path: "profile", element: <PatientProfile /> },
        { path: "settings", element: <PatientSettings /> },
      ],
    },
    {
      path: "/",
      element: <Login />,
    },
  ]);
};

export default AppRoutes;

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../views/home/index.jsx";
import Register from "../views/auth/register.jsx";
import Login from "../views/auth/login.jsx";
import Dashboard from "../views/admin/Dashboard.jsx";
import DashboardUser from "../views/Dashboard.jsx";
import Biodata from "../views/admin/Biodata.jsx";

export default function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Register />
          )
        }
      />

      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />

      {/* route "/user/dashboard" */}
      <Route
        path="/user/dashboard"
        element={
          isAuthenticated ? <DashboardUser /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/dashboard" */}
      <Route
        path="/admin/dashboard"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/biodata" */}
      <Route
        path="/admin/biodata"
        element={
          isAuthenticated ? <Biodata /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/users/edit/:id" */}
    </Routes>
  );
}

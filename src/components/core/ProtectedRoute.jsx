// components/ProtectedRoute.jsx
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authStore } from "../models/authStore";

const ProtectedRoute = ({ children }) => {
  const token = authStore.jwt.token;
  const loading = authStore.loading;

  // Si está cargando, muestra un spinner o loading
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Cargando...</p>
      </div>
    );
  }

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, renderiza el componente children
  return children;
};

export default ProtectedRoute;

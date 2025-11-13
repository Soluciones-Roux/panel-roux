import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute, Layout } from "./components/core";
import Home from "./pages/Home";
import Login from "./pages/Login";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;

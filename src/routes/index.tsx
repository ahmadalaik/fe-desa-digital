import { Navigate, Route, Routes } from "react-router";
import { useAuthStore } from "../stores/auth";
import Login from "../views/auth/login";
import Dashboard from "../views/admin/dashboard";

export default function AppRoutes() {
  const isAuthenticated = useAuthStore((state) => state.token !== "");

  return (
    <Routes>
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

      <Route
        path="/admin/dashboard"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}

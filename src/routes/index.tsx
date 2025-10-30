import { Navigate, Route, Routes } from "react-router";
import { useAuthStore } from "../stores/auth";
import Login from "../views/auth/login";

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
    </Routes>
  );
}

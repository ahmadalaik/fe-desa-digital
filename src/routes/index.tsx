import { Navigate, Outlet, Route, Routes } from "react-router";
import { useAuthStore } from "../stores/auth";
import Login from "../views/auth/login";
import Dashboard from "../views/admin/dashboard";
import Forbidden from "../views/admin/forbidden";
import Permissions from "../views/admin/permissions";
import PermissionCreate from "../views/admin/permissions/create";
import PermissionEdit from "../views/admin/permissions/edit";

export default function AppRoutes() {
  const isAuthenticated = useAuthStore((state) => state.token !== "");

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />
        }
      />

      <Route
        path="/admin/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/admin/forbidden"
        element={isAuthenticated ? <Forbidden /> : <Navigate to="/login" replace />}
      />

      <Route path="/admin/permissions">
        <Route
          element={isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Permissions />} />
          <Route path="create" element={<PermissionCreate />} />
          <Route path="edit/:id" element={<PermissionEdit />} />
        </Route>
      </Route>


    </Routes>
  );
}

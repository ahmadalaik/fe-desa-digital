import { create } from "zustand";
import type { AuthState, Permissions } from "../types/auth";
import Cookies from "js-cookie";
import API from "../services/api";

export const useAuthStore = create<AuthState>((set) => ({
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null,
  token: Cookies.get("token") || "",
  permissions: Cookies.get("permissions")
    ? JSON.parse(Cookies.get("permissions") as string)
    : {},

  login: async (credentials) => {
    const response = await API.post("/api/login", credentials);
    const { data } = response.data;

    const user = {
      id: data.id,
      name: data.name,
      username: data.username,
      email: data.email,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };

    const token: string = data.token;
    const permissions: Permissions = data.permissions || {};

    set({ user, token, permissions });

    Cookies.set("user", JSON.stringify(user));
    Cookies.set("token", token);
    Cookies.set("permissions", JSON.stringify(permissions));
  },

  logout: () => {
    set({ user: null, token: "", permissions: {} });
    
    Cookies.remove("user");
    Cookies.remove("token");
    Cookies.remove("permissions");
  },
}));

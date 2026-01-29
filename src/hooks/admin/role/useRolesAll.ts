import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import API from "../../../services/api";
import type { Role } from "../../../types/role";

export const useRolesAll = () => {
  return useQuery<Role[], Error>({
    queryKey: ["roles-all"],

    queryFn: async () => {
      const token = Cookies.get("token");
      const response = await API.get("/api/admin/roles/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    },
  });
};

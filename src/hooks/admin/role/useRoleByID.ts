import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import type { Role } from "../../../types/role";
import API from "../../../services/api";

export const useRoleByID = (id: number) => {
  return useQuery<Role, Error>({
    queryKey: ["role", id],

    queryFn: async () => {
      const token = Cookies.get("token");

      const response = await API.get(`/api/admin/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data.data;
    },
  });
};

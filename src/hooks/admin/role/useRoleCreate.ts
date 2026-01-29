import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import type { RoleCreateRequest } from "../../../types/role";
import API from "../../../services/api";

export const useRoleCreate = () => {
  return useMutation({
    mutationFn: async (data: RoleCreateRequest) => {
      const token = Cookies.get("token");

      const response = await API.post("/api/admin/roles", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });
};

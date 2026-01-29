import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import API from "../../../services/api";
import type { RoleUpdateRequest } from "../../../types/role";

export const useRoleUpdate = () => {
  return useMutation({
    mutationFn: async (data: RoleUpdateRequest) => {
      const token = Cookies.get("token");

      const response = await API.put(`/api/admin/roles/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });
};

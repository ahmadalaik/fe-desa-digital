import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import API from "../../../services/api";

export const useRoleDelete = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const token = Cookies.get("token");

      const response = await API.delete(`/api/admin/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import API from "../../../services/api";

export const usePermissionDelete = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const token = Cookies.get("token");
      const response = await API.delete(`/api/admin/permissions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};

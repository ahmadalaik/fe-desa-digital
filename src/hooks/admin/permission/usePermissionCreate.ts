import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import API from "../../../services/api";
import type { PermissionCreateRequest } from "../../../types/permission";

export const usePermissionCreate = () => {
  return useMutation({
    mutationFn: async (data: PermissionCreateRequest) => {
      const token = Cookies.get("token");
      const response = await API.post("/api/admin/permissions", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};

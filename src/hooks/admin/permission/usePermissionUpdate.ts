import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import API from "../../../services/api";
import type { PermissionUpdateRequest } from "../../../types/permission";

export const usePermissionUpdate = () => {
  return useMutation({
    mutationFn: async (data: PermissionUpdateRequest) => {
      const token = Cookies.get("token");
      const response = await API.put(
        `/api/admin/permissions/${data.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
  });
};

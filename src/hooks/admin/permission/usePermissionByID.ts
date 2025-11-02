import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import API from "../../../services/api";
import type { Permission } from "../../../types/permission";

export const usePermissionByID = (id: number) => {
  return useQuery<Permission, Error>({
    queryKey: ["permission", id],

    queryFn: async () => {
      const token = Cookies.get("token");
      const response = await API.get(`/api/admin/permissions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      return data as Permission;
    },
  });
};

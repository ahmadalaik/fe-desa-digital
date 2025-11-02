import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import API from "../../../services/api";
import type { Permission } from "../../../types/permission";

export const usePermissionsAll = () => {
  return useQuery<Permission[], Error>({
    queryKey: ["permissions-all"],

    queryFn: async () => {
      const token = Cookies.get("token");
      const response = await API.get("/api/admin/permissions/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      return data;
    },
  });
};

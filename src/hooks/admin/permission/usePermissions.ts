import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import API from "../../../services/api";
import type { Params } from "../../../types/param";
import type { PermissionsResponses } from "../../../types/permission";

export const usePermissions = ({ page, search }: Params) => {
  return useQuery<PermissionsResponses, Error>({
    queryKey: ["permissions", page, search],

    queryFn: async () => {
      const token = Cookies.get("token");
      const response = await API.get(
        `/api/admin/permissions?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response.data;
      return data;
    },
  });
};

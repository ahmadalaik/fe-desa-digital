import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import type { Params } from "../../../types/param";
import type { RolesResponses } from "../../../types/role";
import API from "../../../services/api";

export const useRoles = ({ page, search }: Params) => {
  return useQuery<RolesResponses, Error>({
    queryKey: ["roles", page, search],

    queryFn: async () => {
      const token = Cookies.get("token");

      const response = await API.get(
        `/api/admin/roles?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data.data;
    },
  });
};

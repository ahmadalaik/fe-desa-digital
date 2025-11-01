import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import API from "../../../services/api";
import { type DashboardResponse } from "../../../types/dashboard";

export const useDashboard = () => {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const token = Cookies.get("token");
      const response = await API.get("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      return data;
    },
  });
};

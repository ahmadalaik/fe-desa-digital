import axios, { AxiosError, type AxiosResponse } from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const excludedEndpoints = ["login"];
    const shouldSkip = excludedEndpoints.some((endpoint) =>
      error.config?.url?.includes(endpoint)
    );

    if (shouldSkip) return Promise.reject(error);

    if (error.response?.status === 401) {
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("permissions");

      window.location.href = "/login";
    } else if (error.response?.status === 403) {
      window.location.href = "/admin/forbidden";
    } else {
      return Promise.reject(error);
    }
  }
);

export default API;

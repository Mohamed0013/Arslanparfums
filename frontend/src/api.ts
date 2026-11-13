import axios from "axios";

const apiBaseUrl =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() ||
  "https://webproject-production-1678.up.railway.app/api";

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default api;
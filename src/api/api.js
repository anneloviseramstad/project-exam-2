import axios from "axios";

const api = axios.create({
  baseURL: "https://v2.api.noroff.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

  config.headers["X-Noroff-API-Key"] = apiKey;
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;

import axios from "axios";

/**
 * Axios instance configured for the Noroff API.
 * Sets the base URL and default headers for all requests.
 */

const api = axios.create({
  baseURL: "https://v2.api.noroff.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor that attaches API key and token (if available)
 * to every outgoing request.
 * @param {import("axios").InternalAxiosRequestConfig} config - The request configuration object.
 * @returns {import("axios").InternalAxiosRequestConfig} Updated config with authentication headers.
 */

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

  config.headers["X-Noroff-API-Key"] = apiKey;
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;

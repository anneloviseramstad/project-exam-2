import api from "./api";

export const authService = {
  register(userData) {
    return api.post("/auth/register", userData).then((res) => res.data);
  },
  login(credentials) {
    return api.post("/auth/login", credentials).then((res) => res.data);
  },
};

import api from "./api";

export const authService = {
  async register(userData) {
    const res = await api.post("/auth/register", userData);
    return res.data.data;
  },
  async login(credentials) {
    const res = await api.post("/auth/login", credentials);
    return res.data.data;
  },
  async getProfile(name, token) {
    const res = await api.get(`/holidaze/profiles/${name}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },
  async updateProfile(name, payload, token) {
    if (!payload || typeof payload !== "object") {
      throw new Error("Payload must be an object");
    }

    const res = await api.put(`/holidaze/profiles/${name}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.data;
  },
};

import { defineStore } from "pinia";
import { authService } from "../api/authService";
import router from "../router/index";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    role: (state) => (state.user?.venueManager ? "manager" : "customer"),
  },

  actions: {
    async login(credentials) {
      const res = await authService.login(credentials);

      this.token = res.accessToken;
      localStorage.setItem("token", res.accessToken);

      await this.fetchProfile();

      router.push("/profile");
    },

    async register(data) {
      return await authService.register(data);
    },

    async fetchProfile() {
      if (!this.token) return;

      const profile = await authService.getProfile();
      this.user = profile;
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      router.push("/");
    },
  },
});

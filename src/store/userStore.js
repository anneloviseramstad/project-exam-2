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
    username: (state) => state.user?.name || null,
    role: (state) => (state.user?.venueManager ? "manager" : "customer"),
  },
  actions: {
    async login(credentials) {
      const res = await authService.login(credentials);
      const { data } = res;

      this.token = data.accessToken;
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("username", data.name);

      this.user = {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        banner: data.banner,
        venueManager: data.venueManager,
      };

      router.push({ name: "Home" });
    },

    async register(payload) {
      await authService.register(payload);
      router.push({ name: "Login" });
    },

    loadFromStorage() {
      const username = localStorage.getItem("username");
      if (this.token && username) {
        this.user = { name: username };
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      router.push({ name: "Home" });
    },
  },
});

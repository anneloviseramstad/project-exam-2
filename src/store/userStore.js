import { defineStore } from "pinia";
import { authService } from "../api/authService";
import router from "../router";

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
      const resData = await authService.login(credentials);

      this.token = resData.accessToken;
      localStorage.setItem("token", resData.accessToken);

      this.user = {
        name: resData.name,
        email: resData.email,
        avatar: resData.avatar,
        banner: resData.banner,
        bio: resData.bio || "",
        venueManager: resData.venueManager || false,
        _count: resData._count || { venues: 0, bookings: 0 },
      };

      localStorage.setItem("user", JSON.stringify(this.user));

      router.push({ name: "Home" });
    },

    async register(payload) {
      await authService.register(payload);
      router.push({ name: "Auth", query: { tab: "login" } });
    },

    async fetchProfile() {
      if (!this.token) return;

      try {
        const data = await authService.getProfile(this.token);
        this.user = {
          name: data.name,
          email: data.email,
          avatar: data.avatar,
          banner: data.banner,
          bio: data.bio || "",
          venueManager: data.venueManager || false,
          _count: data._count || { venues: 0, bookings: 0 },
        };

        localStorage.setItem("user", JSON.stringify(this.user));

        if (data.accessToken) {
          this.token = data.accessToken;
          localStorage.setItem("token", data.accessToken);
        }
      } catch (err) {
        console.error("fetchProfile failed:", err);
        this.logout();
      }
    },

    loadFromStorage() {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) this.token = storedToken;
      if (storedUser) {
        try {
          this.user = JSON.parse(storedUser);
        } catch {
          this.user = null;
        }
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push({ name: "Home" });
    },
  },
});

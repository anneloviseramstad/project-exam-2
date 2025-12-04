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
        _count: resData._count || { venues: 0, bookings: 0 },
      };
      localStorage.setItem("user", JSON.stringify(this.user));

      await this.fetchProfile();
    },

    async register(payload) {
      await authService.register(payload);

      const resData = await authService.login({
        email: payload.email,
        password: payload.password,
      });

      this.token = resData.accessToken;
      localStorage.setItem("token", resData.accessToken);

      this.user = {
        name: resData.name,
        email: resData.email,
        avatar: resData.avatar,
        banner: resData.banner,
        bio: resData.bio || "",
        _count: resData._count || { venues: 0, bookings: 0 },
      };
      localStorage.setItem("user", JSON.stringify(this.user));

      await this.fetchProfile();
    },

    async fetchProfile() {
      if (!this.token) return;

      try {
        const resData = await authService.getProfile(this.user.name);
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
      } catch (err) {
        console.error("fetchProfile failed:", err);
        this.logout();
      }
    },
    async updateProfile(payload) {
      if (!this.token) throw new Error("Not authenticated");

      const updatedUser = await authService.updateProfile(
        this.user.name,
        payload,
        this.token
      );

      this.user = {
        ...this.user,
        avatar: updatedUser.avatar || this.user.avatar,
        banner: updatedUser.banner || this.user.banner,
        bio: updatedUser.bio ?? this.user.bio,
      };

      localStorage.setItem("user", JSON.stringify(this.user));
      return this.user;
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push({ name: "Home" });
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
  },
});

import { defineStore } from "pinia";
import { authService } from "../api/authService";
import { venueService } from "../api/venueService";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async register(userData) {
      const data = await authService.register(userData);
      this.user = data;
      if (data.accessToken) {
        this.token = data.accessToken;
        localStorage.setItem("token", data.accessToken);
      }
    },
    async login(credentials) {
      const data = await authService.login(credentials);
      this.user = data;
      if (data.accessToken) {
        this.token = data.accessToken;
        localStorage.setItem("token", data.accessToken);
      }
    },
    async logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const useVenuesStore = defineStore("venues", {
  state: () => ({
    venues: [],
    loading: false,
    error: "",
  }),
  actions: {
    async fetchVenues() {
      this.loading = true;
      this.error = "";
      try {
        const data = await venueService.getAllVenues();
        this.venues = data;
      } catch (err) {
        console.error(err);
        this.error = "Kunne ikke hente venues";
      } finally {
        this.loading = false;
      }
    },
  },
});

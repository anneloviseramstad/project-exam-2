import { defineStore } from "pinia";

export const useUiStore = defineStore("uiStore", {
  state: () => ({
    navLoading: false,
    error: null,
  }),

  actions: {
    startNavigation() {
      this.navLoading = true;
    },
    endNavigation() {
      this.navLoading = false;
    },
    setError(err) {
      this.error = this.parseApiError(err);
    },
    clearError() {
      this.error = null;
    },

    parseApiError(err) {
      if (!err) return "Something went wrong.";

      if (typeof err === "string") return err;

      if (err?.response?.data) {
        const apiErrors = err.response.data.errors;

        if (Array.isArray(apiErrors)) {
          return apiErrors
            .map((e) => {
              if (e.message.includes("stud.noroff.no"))
                return "Only stud.noroff.no emails are allowed";
              if (e.message.includes("Password must be at least"))
                return "Password must be at least 8 characters";
              if (e.message.includes("Email must be a valid email"))
                return "Please enter a valid email";
              return e.message;
            })
            .join("\n");
        }

        return err.response.data.message || "Something went wrong.";
      }

      return err.message || "Something went wrong.";
    },
  },
});

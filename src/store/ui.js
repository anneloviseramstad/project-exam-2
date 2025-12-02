import { defineStore } from "pinia";

export const useUiStore = defineStore("uiStore", {
  state: () => ({
    navLoading: false,
    message: null,
    messageType: "Success",
  }),

  actions: {
    startNavigation() {
      this.navLoading = true;
    },
    endNavigation() {
      this.navLoading = false;
    },
    setError(err) {
      this.message = this.parseApiError(err);
      this.messageType = "Error";

      setTimeout(() => {
        this.message = null;
      }, 3000);
    },
    setMessage(msg, type = "Success") {
      this.message = msg;
      this.messageType = type;
      setTimeout(() => {
        if (this.message === msg) this.message = null;
      }, 3000);
    },
    clearMessage() {
      this.message = null;
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

import { defineStore } from "pinia";

/**
 * Pinia store for managing UI state and notifications.
 *
 * State:
 * - navLoading: Boolean indicating if a page navigation is in progress.
 * - message: Current UI message (string or null).
 * - messageType: Type of the message ("Success", "Error", "Warning").
 *
 * Actions:
 * - startNavigation(): Set navLoading to true.
 * - endNavigation(): Set navLoading to false.
 * - setError(err): Display an error message from an API or JS error.
 * - setMessage(msg, type): Display a custom message of given type.
 * - clearMessage(): Clear the current message.
 * - parseApiError(err): Convert an API error response or JS error into a user-friendly message.
 */

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

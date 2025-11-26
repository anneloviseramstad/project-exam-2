import { reactive } from "vue";

export const uiStore = reactive({
  navLoading: false,

  startNavigation() {
    this.navLoading = true;
  },

  endNavigation() {
    this.navLoading = false;
  },

  error: null,

  setError(message) {
    this.error = message;
  },

  clearError() {
    this.error = null;
  },
});

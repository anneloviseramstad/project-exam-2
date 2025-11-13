import { reactive } from "vue";

export const uiStore = reactive({
  loading: false,
  error: null,

  setLoading(value) {
    this.loading = value;
  },

  setError(message) {
    this.error = message;
  },
  clearError() {
    this.error = null;
  },
});

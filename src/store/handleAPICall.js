import { useUiStore } from "./ui";

/**
 * Utility function to handle API calls with automatic UI error handling.
 *
 * @param {Function} apiCall - An async function representing the API call.
 * @returns {Promise<any>} - Resolves with the result of the API call.
 * @throws Will re-throw the error after setting it in the UI store.
 *
 * Usage:
 * await handleApiCall(() => api.get('/endpoint'));
 */

export async function handleApiCall(apiCall) {
  const uiStore = useUiStore();

  try {
    return await apiCall();
  } catch (err) {
    uiStore.setError(err);
    throw err;
  }
}

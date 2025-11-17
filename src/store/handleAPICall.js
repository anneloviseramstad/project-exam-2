import { uiStore } from "./ui";

export async function handleApiCall(apiCall) {
  try {
    return await apiCall();
  } catch (err) {
    uiStore.setError(err);
    throw err;
  }
}

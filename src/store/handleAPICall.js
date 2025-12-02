import { useUiStore } from "./ui";

export async function handleApiCall(apiCall) {
  const uiStore = useUiStore();

  try {
    return await apiCall();
  } catch (err) {
    uiStore.setError(err);
    throw err;
  }
}

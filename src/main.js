import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { useUserStore } from "./store/userStore";

/**
 * Initializes the Vue application:
 * - Creates the app and Pinia store.
 * - Sets up the router.
 * - Loads user data from local storage and fetches profile if needed.
 * - Mounts the app to the DOM.
 */

async function initApp() {
  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);
  app.use(router);

  const userStore = useUserStore();
  userStore.loadFromStorage();

  if (userStore.token && !userStore.user) {
    await userStore.fetchProfile();
  }

  app.mount("#app");
}

initApp();

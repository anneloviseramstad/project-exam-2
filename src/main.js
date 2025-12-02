import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { useUserStore } from "./store/userStore";

async function bootstrap() {
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

bootstrap();

import { createRouter, createWebHistory } from "vue-router";
import { uiStore } from "../store/ui.js";

import Home from "../views/Home.vue";
import VenueListPage from "../views/VenuesListPage.vue";
import VenuePage from "../views/VenuePage.vue";
import Profile from "../views/Profile.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/venues", name: "VenueListPage", component: VenueListPage },
  { path: "/venues/:id", name: "VenuePage", component: VenuePage, props: true },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: "Auth",
  },

  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  uiStore.setLoading(true);
  uiStore.clearError();

  const requiresAuth = to.meta.requiresAuth;
  const requiredRole = to.meta.requiresRole;

  try {
    if (requiresAuth && !uiStore.isLoggedIn) {
      uiStore.setError("You have to be logged in to visit this site.");
      return next({ name: "Login" });
    }

    if (requiredRole && userStore.role !== requiredRole) {
      uiStore.setError("You have no access to this site.");
      return next({ name: "Home" });
    }

    next();
  } catch (err) {
    uiStore.setError("An error occurred when navigating.");
    next({ name: "Home" });
  } finally {
    uiStore.setLoading(false);
  }
});

export default router;

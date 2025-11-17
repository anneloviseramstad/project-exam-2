import { createRouter, createWebHistory } from "vue-router";
import { uiStore } from "../store/ui.js";

import Home from "../views/Home.vue";
import VenuesList from "../views/VenuesList.vue";
import VenuePage from "../views/VenuePage.vue";
import Profile from "../views/Profile.vue";
import AdminDashboard from "../views/AdminDashboard.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/venues", name: "VenuesList", component: VenuesList },
  { path: "/venues/:id", name: "VenuePage", component: VenuePage, props: true },
  { path: "/login", name: "AuthView" },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresRole: "VenueManager" },
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
    if (requiresAuth && !userStore.isLoggedIn) {
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

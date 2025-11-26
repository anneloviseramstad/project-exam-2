import { createRouter, createWebHistory } from "vue-router";
import { uiStore } from "../store/ui";
import { useUserStore } from "../store/userStore";

import Home from "../views/Home.vue";
import VenueListPage from "../views/VenuesListPage.vue";
import VenuePage from "../views/VenuePage.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Auth.vue";
import ManagerPage from "../views/ManagerPage.vue";

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
    path: "/manager-only",
    name: "ManagerPage",
    component: ManagerPage,
    meta: { requiresAuth: true, requiresRole: "manager" },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  uiStore.startNavigation();
  uiStore.clearError();

  const requiresAuth = to.meta.requiresAuth;
  const requiredRole = to.meta.requiresRole;

  const userStore = useUserStore();

  if (requiresAuth && !userStore.isLoggedIn) {
    uiStore.setError("You must be logged in to access this page.");
    return next({ name: "Login" });
  }

  if (requiredRole && userStore.role !== requiredRole) {
    uiStore.setError("You do not have access to this area.");
    return next({ name: "Home" });
  }

  next();
});

router.afterEach(() => {
  uiStore.endNavigation();
});

export default router;

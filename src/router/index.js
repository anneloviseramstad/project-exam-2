import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import VenuesList from "../views/VenuesList.vue";
import VenuePage from "../views/VenuePage.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import AdminDashboard from "../views/AdminDashboard.vue";

import { useUserStore } from "../store/user";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/venues", name: "VenuesList", component: VenuesList },
  { path: "/venues/:id", name: "VenuePage", component: VenuePage, props: true },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
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
  const userStore = useUserStore();
  const requiresAuth = to.meta.requiresAuth;
  const requiredRole = to.meta.requiresRole;

  if (requiresAuth && !userStore.isLoggedIn) {
    next({ name: "Login" });
  } else if (requiredRole && userStore.role !== requiredRole) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import { useUiStore } from "../store/ui";
import { useUserStore } from "../store/userStore";

import Home from "../views/Home.vue";
import VenueListPage from "../views/VenuesListPage.vue";
import VenuePage from "../views/VenuePage.vue";
import Profile from "../views/Profile.vue";
import ManagerPage from "../views/ManagerPage.vue";
import Auth from "../views/Auth.vue";
import CreateVenue from "../views/CreateVenue.vue";
import EditVenue from "../views/EditVenue.vue";

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
    path: "/manager-only/create",
    name: "CreateVenue",
    component: CreateVenue,
    meta: { requiresAuth: true, requiresRole: "manager" },
  },
  {
    path: "/manager-only/edit/:id",
    name: "EditVenue",
    component: EditVenue,
    props: true,
    meta: { requiresAuth: true, requiresRole: "manager" },
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const uiStore = useUiStore();
  const userStore = useUserStore();

  uiStore.startNavigation();

  if (!userStore.user && userStore.token) {
    try {
      await userStore.fetchProfile();
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      userStore.logout();
    }
  }

  if (to.meta.requiresRole && userStore.role !== to.meta.requiresRole) {
    uiStore.setMessage("You do not have access to this area.", "Error");
    return next({ name: "Home" });
  }

  next();
});

router.afterEach(() => {
  const uiStore = useUiStore();
  uiStore.endNavigation();
});

export default router;

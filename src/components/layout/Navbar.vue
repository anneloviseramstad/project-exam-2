<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useUserStore } from "../../store/userStore";
import { UserIcon } from "@heroicons/vue/24/outline";

/**
 * Navbar component that provides the main site navigation.
 * Features:
 * - Sticky header with hide-on-scroll behavior.
 * - Responsive menu toggle for mobile screens.
 * - Shows login button or user profile/logout options based on login state.
 * - Highlights the active route for navigation links.
 */

const userStore = useUserStore();
const route = useRoute();

const menuOpen = ref(false);
const hidden = ref(false);
let lastScroll = 0;

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
function closeMenu() {
  menuOpen.value = false;
}
function logout() {
  closeMenu();
  userStore.logout();
}
function handleScroll() {
  const currentScroll = window.pageYOffset;
  hidden.value = currentScroll > lastScroll && currentScroll > 50;
  lastScroll = currentScroll;
}

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const displayName = computed(() => userStore.user?.name || "PROFILE");
const profileUrl = computed(() =>
  userStore.role === "manager" ? "/manager-only" : "/profile"
);
</script>

<template>
  <nav
    class="sticky top-0 left-0 w-full z-50 bg-white transition-transform duration-300 shadow"
    :class="hidden ? '-translate-y-full' : 'translate-y-0'"
  >
    <div
      class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center font-base font-extralight"
    >
      <RouterLink to="/" @click="closeMenu" class="flex items-center gap-2">
        <img src="/src/assets/logo.png" class="h-8 w-auto" />
        <span class="logo text-gray-900">HOLIDAZE</span>
      </RouterLink>
      <ul class="hidden md:flex gap-8 items-center">
        <li>
          <RouterLink
            to="/venues"
            class="pb-1"
            :class="
              route.path.startsWith('/venues')
                ? 'border-b-2 border-gray-400'
                : 'hover:text-gray-300'
            "
          >
            BROWSE VENUES
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/about"
            class="pb-1"
            :class="
              route.path === '/about'
                ? 'border-b-2 border-gray-400'
                : 'hover:text-gray-300'
            "
          >
            ABOUT US
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/contact"
            class="pb-1"
            :class="
              route.path === '/contact'
                ? 'border-b-2 border-gray-400'
                : 'hover:text-gray-300'
            "
          >
            CONTACT
          </RouterLink>
        </li>
      </ul>
      <ul class="hidden md:flex items-center gap-8">
        <li v-if="!userStore.isLoggedIn">
          <RouterLink
            to="/auth"
            class="border rounded-full border-gray-500 px-4 py-2 font-normal"
          >
            LOGIN
          </RouterLink>
        </li>
        <template v-else>
          <li>
            <RouterLink :to="profileUrl">
              <UserIcon class="w-6 h-6" aria-hidden="true" />
            </RouterLink>
          </li>
          <li>
            <button @click="logout" class="border border-white px-4 py-2">
              LOG OUT
            </button>
          </li>
        </template>
      </ul>
      <button
        @click="toggleMenu"
        class="md:hidden focus:outline-none cursor-pointer"
      >
        <svg
          v-if="!menuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <transition name="fade">
      <ul
        v-if="menuOpen"
        @click.self="closeMenu"
        class="flex flex-col items-center gap-4 py-6 w-full bg-white"
      >
        <li>
          <RouterLink
            to="/venues"
            @click="closeMenu"
            :class="
              route.path.startsWith('/venues')
                ? 'border-b-2 border-gray-400'
                : 'hover:text-gray-300'
            "
          >
            BROWSE VENUES
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/about"
            @click="closeMenu"
            :class="
              route.path === '/about'
                ? 'border-b-2 border-gray-400'
                : 'hover:text-gray-300'
            "
          >
            ABOUT US
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/contact"
            @click="closeMenu"
            :class="
              route.path === '/contact'
                ? 'border-b-2 border-gray-400'
                : 'hover:text-gray-300'
            "
          >
            CONTACT
          </RouterLink>
        </li>
        <li v-if="!userStore.isLoggedIn">
          <RouterLink
            to="/auth"
            class="border rounded-full border-gray-500 px-4 py-2 font-normal"
          >
            LOGIN
          </RouterLink>
        </li>
        <template v-else>
          <li>
            <RouterLink :to="profileUrl" @click="closeMenu">
              <UserIcon class="w-6 h-6" aria-hidden="true" />
            </RouterLink>
          </li>
          <li>
            <button @click="logout" class="border border-white px-4 py-2">
              LOG OUT
            </button>
          </li>
        </template>
      </ul>
    </transition>
  </nav>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

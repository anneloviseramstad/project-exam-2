<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";

const menuOpen = ref(false);
const hidden = ref(false);
let lastScroll = 0;

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
function closeMenu() {
  menuOpen.value = false;
}

function handleScroll() {
  const currentScroll = window.pageYOffset;
  hidden.value = currentScroll > lastScroll && currentScroll > 50;
  lastScroll = currentScroll;
}

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 w-full z-50 bg-dark text-white transition-transform duration-300',
      hidden ? '-translate-y-full' : 'translate-y-0',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <RouterLink to="/" class="flex items-center gap-2">
        <img src="/src/assets/logo.png" class="h-8 w-auto" />
        <span class="logo">HOLIDAZE</span>
      </RouterLink>
      <ul class="hidden md:flex gap-6 items-center">
        <li><RouterLink to="/venues">BROWSE VENUES</RouterLink></li>
        <li><RouterLink to="/about">ABOUT US</RouterLink></li>
        <li><RouterLink to="/contact">CONTACT</RouterLink></li>
      </ul>
      <RouterLink to="/login" class="hidden md:inline-flex btn px-6 py-2"
        >LOG IN</RouterLink
      >
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
        class="absolute top-full left-0 w-full bg-dark flex flex-col items-center gap-4 py-6 text-xl"
      >
        <li>
          <RouterLink to="/venues" @click="closeMenu">BROWSE VENUES</RouterLink>
        </li>
        <li>
          <RouterLink to="/about" @click="closeMenu">ABOUT US</RouterLink>
        </li>
        <li>
          <RouterLink to="/contact" @click="closeMenu">CONTACT</RouterLink>
        </li>
        <li><RouterLink to="/login" @click="closeMenu">LOG IN</RouterLink></li>
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
.bg-dark {
  background-color: #1a1a1a;
}
</style>

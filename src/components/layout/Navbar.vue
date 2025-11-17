<script setup>
import { ref } from "vue";
import { computed } from "vue";

const menuOpen = ref(false);

function closeMenu() {
  menuOpen.value = false;
}
</script>

<template>
  <header
    class="relative bg-primary bg-cover bg-center flex flex-col justify-between p-6"
  >
    <div class="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>
    <nav class="relative z-50 flex justify-between items-center text-white">
      <a href="/">
        <h1 class="h1">Holidaze</h1>
      </a>

      <ul class="hidden md:flex gap-6">
        <li>All Venues</li>
        <li>Register</li>
        <li>Log in</li>
      </ul>
      <button
        @click="menuOpen = !menuOpen"
        class="md:hidden focus:outline-none relative z-[9999] cursor-pointer"
        aria-label="Toggle menu"
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
    </nav>

    <hr class="hidden md:block text-white mt-2" />

    <transition name="fade">
      <ul
        v-if="menuOpen"
        @click.self="closeMenu"
        class="absolute top-0 left-0 w-full h-full bg-black/80 text-white flex flex-col justify-center items-center gap-6 text-xl z-40"
      >
        <li><a href="/register" @click="closeMenu">Sign up</a></li>
        <li><a href="/login" @click="closeMenu">Log in</a></li>
      </ul>
    </transition>
  </header>
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

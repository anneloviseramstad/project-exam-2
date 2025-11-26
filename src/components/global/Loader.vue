<script setup>
import { uiStore } from "../../store/ui";
</script>

<template>
  <div
    v-if="uiStore.navLoading"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
  >
    <div
      class="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
    ></div>
  </div>
</template>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>

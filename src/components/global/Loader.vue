<script setup>
import { uiStore } from "../../store/ui";
</script>

<template>
  <div
    v-if="uiStore.loading"
    class="fixed inset-0 z-40 flex items-center justify-center bg-black/10"
  >
    <div
      class="loader border-4 border-t-blue-500 border-gray-200 rounded-full w-12 h-12 animate-spin"
    ></div>
  </div>
</template>

<style>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

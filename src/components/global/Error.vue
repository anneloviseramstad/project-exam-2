<script setup>
import { uiStore } from "../../store/ui";
</script>

<template>
  <transition name="fade">
    <div
      v-if="uiStore.error"
      class="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg z-50"
    >
      <div class="flex items-center gap-3">
        <span>{{ uiStore.error }}</span>
        <button
          @click="uiStore.clearError()"
          class="text-white font-bold hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

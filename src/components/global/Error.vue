<script setup>
import { ref, watch } from "vue";
import { uiStore } from "../../store/ui";

const showError = ref(null);

watch(
  () => uiStore.error,
  (newError) => {
    showError.value = newError;
  }
);

function closePopup() {
  showError.value = null;
  uiStore.clearError();
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="showError"
      class="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <div class="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      <div
        class="relative bg-red-600 text-white px-6 py-4 rounded-xl shadow-lg max-w-md w-full flex items-center justify-between gap-4 pointer-events-auto"
      >
        <p class="text-center">{{ showError }}</p>
        <button
          @click="closePopup"
          class="bg-white text-red-600 px-3 py-1 rounded-md font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  </transition>
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

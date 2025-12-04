<script setup>
import { useUiStore } from "../../store/ui";
const uiStore = useUiStore();
</script>

<template>
  <transition name="fade">
    <div
      v-if="uiStore.message"
      :class="[
        'fixed top-20 right-4 px-4 py-3 rounded-lg shadow text-white flex items-center gap-3 z-50',
        uiStore.messageType === 'Success' && 'bg-green-500',
        uiStore.messageType === 'Warning' && 'bg-yellow-500',
        uiStore.messageType === 'Error' && 'bg-red-500',
      ]"
    >
      <span v-if="uiStore.messageType === 'Success'">✔️</span>
      <span v-if="uiStore.messageType === 'Warning'">⚠️</span>
      <span v-if="uiStore.messageType === 'Error'">❌</span>
      <span>{{ uiStore.message }}</span>
    </div>
  </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

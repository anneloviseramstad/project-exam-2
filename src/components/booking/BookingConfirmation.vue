<script setup>
import { useUiStore } from "../../store/ui";
import { computed } from "vue";

const uiStore = useUiStore();

const visible = computed(() => uiStore.message !== null);

function closePopup() {
  uiStore.clearMessage();
}
</script>

<template>
  <transition name="fade-up">
    <div
      v-if="visible"
      class="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg cursor-pointer z-50"
      @click="closePopup"
    >
      <strong class="block text-lg">Successful booking!</strong>
      <span>{{ uiStore.message }}</span>
    </div>
  </transition>
</template>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.25s ease;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>

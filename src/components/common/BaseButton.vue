<template>
  <button
    :class="[
      'px-4 py-2 rounded transition-colors',
      variant === 'primary' ? 'bg-blue-500 text-white hover:bg-blue-600' : '',
      variant === 'secondary'
        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        : '',
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: "primary" },
  disabled: { type: Boolean, default: false },
});
</script>

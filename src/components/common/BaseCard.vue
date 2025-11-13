<script setup>
defineProps({
  className: { type: String, default: "" },
});
</script>

<template>
  <div class="card">
    <slot />
  </div>
</template>

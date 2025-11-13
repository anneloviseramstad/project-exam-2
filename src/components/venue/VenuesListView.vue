<script setup>
import VenueCard from "./VenueCard.vue";
import { uiStore } from "../../store/ui";

defineProps({
  venues: { type: Array, default: () => [] },
  error: { type: String, default: null },
});
</script>

<template>
  <section class="py-4">
    <div v-if="uiStore.loading" class="text-gray-500">Loading...</div>
    <p v-if="uiStore.error" class="text-red-500">{{ uiStore.error }}</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <div
      v-if="venues.length"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <VenueCard v-for="venue in venues" :key="venue.id" :venue="venue" />
    </div>
  </section>
</template>

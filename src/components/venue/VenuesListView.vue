<script setup>
import VenueCard from "./VenueCard.vue";

defineProps({
  venues: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <section class="mx-auto max-w-6xl py-4 px-4">
    <h2 class="text-3xl font-medium my-8">
      Handpicked Venues Across the Globe
    </h2>
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div
        class="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"
      ></div>
    </div>
    <p v-else-if="error" class="text-red-500 text-center py-4">{{ error }}</p>
    <div
      v-else-if="venues.length"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <VenueCard v-for="venue in venues" :key="venue.id" :venue="venue" />
    </div>
    <p v-else class="text-gray-600 text-center py-4">No venues found.</p>
  </section>
</template>

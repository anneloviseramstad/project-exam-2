<script setup>
import VenueCard from "./VenueCard.vue";

/**
 * VenuesListView component that displays a list of venues in a grid layout.
 * Handles three states: loading, error, and no results.
 *
 * Props:
 * @prop {Array} venues - Array of venue objects to display.
 * @prop {Boolean} loading - Indicates if the venues are being loaded.
 * @prop {String|null} error - Error message to display if fetching fails.
 */

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
  <section class="mx-auto max-w-6xl py-4 px-4 mt-2 md:mt-8">
    <h2 class="text-3xl font-semibold mb-6 text-center lg:text-left">
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

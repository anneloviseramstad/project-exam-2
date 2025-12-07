<script setup>
import { ref, onMounted } from "vue";
import { venueService } from "../../api/venueService";
import { ArrowUpRightIcon } from "@heroicons/vue/24/outline";

const venues = ref([]);

/**
 * FeaturedGrid component that fetches and displays a list of featured venues.
 * Shows only venues that have at least one media item. Clicking a venue navigates
 * to its detail page. Limited to the first 4 venues on initial load.
 */

async function fetchVenues() {
  try {
    const response = await venueService.getAllVenues(1, 4);
    const data = response.data || [];
    venues.value = data.filter(
      (v) => Array.isArray(v.media) && v.media.length > 0
    );
  } catch (err) {
    console.error("Failed to fetch venues:", err);
  }
}

onMounted(fetchVenues);
</script>

<template>
  <section class="py-4 px-4 max-w-6xl mx-auto mt-2">
    <div class="grid gap-4 grid-cols-2 md:grid-cols-4 auto-rows-[200px]">
      <div
        v-for="venue in venues"
        :key="venue.id"
        @click="$router.push('/venues/' + venue.id)"
        class="relative rounded-lg overflow-hidden cursor-pointer group"
      >
        <img
          :src="venue.media[0].url"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
        ></div>
        <div class="absolute bottom-3 left-3 text-white">
          <p class="font-semibold">{{ venue.name }}</p>
          <p class="text-sm opacity-80">
            {{ venue.location.city }}, {{ venue.location.country }}
          </p>
        </div>
        <ArrowUpRightIcon
          class="absolute bottom-3 right-3 w-6 h-6 text-white"
          aria-hidden="true"
        />
      </div>
    </div>
  </section>
</template>

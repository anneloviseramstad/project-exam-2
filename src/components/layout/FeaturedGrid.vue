<script setup>
import { ref, onMounted } from "vue";
import { venueService } from "../../api/venueService";
import { ArrowUpRightIcon } from "@heroicons/vue/24/outline";

const venues = ref([]);

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
  <section class="py-8 px-4 max-w-6xl mx-auto">
    <h2 class="text-3xl font-semibold mb-6 text-center lg:text-left">
      Featured Venues
    </h2>

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
          <h3 class="font-semibold">{{ venue.name }}</h3>
          <p class="text-sm opacity-80">
            {{ venue.location.city }}, {{ venue.location.country }}
          </p>
        </div>
        <ArrowUpRightIcon
          class="absolute bottom-3 right-3 w-6 h-6 text-white"
        />
      </div>
    </div>
  </section>
</template>

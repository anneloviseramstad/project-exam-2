<script setup>
import { ref, onMounted } from "vue";
import { venueService } from "../../api/venueService";

const venues = ref([]);
const currentIndex = ref(0);
const loading = ref(false);
const error = ref("");

async function fetchVenues() {
  loading.value = true;
  error.value = "";
  try {
    const response = await venueService.getAllVenues(1, 5);
    const data = response.data || [];
    venues.value = data.filter(
      (v) => Array.isArray(v.media) && v.media.length > 0
    );

    currentIndex.value = 0;
  } catch (err) {
    console.error(err);
    error.value = "Kunne ikke hente venues.";
    venues.value = [];
    currentIndex.value = 0;
  } finally {
    loading.value = false;
  }
}

function nextVenue() {
  if (!venues.value.length) return;
  currentIndex.value = (currentIndex.value + 1) % venues.value.length;
}

function prevVenue() {
  if (!venues.value.length) return;
  currentIndex.value =
    (currentIndex.value - 1 + venues.value.length) % venues.value.length;
}

onMounted(fetchVenues);
</script>

<template>
  <header
    class="relative mx-auto max-w-6xl h-[30vh] md:h-[50vh] bg-center bg-cover flex items-center justify-center rounded-3xl shadow"
    :style="`background-image: url('${
      venues[currentIndex]?.media?.[0]?.url || '/placeholder.jpg'
    }')`"
  >
    <div class="absolute inset-0 bg-black/70 rounded-3xl"></div>
    <div
      class="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-white text-3xl"
      @click="prevVenue"
    >
      &#10094;
    </div>
    <div
      class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white text-3xl"
      @click="nextVenue"
    >
      &#10095;
    </div>
    <div class="flex flex-col gap-4 max-w-200 text-center z-10 px-4">
      <h1 class="text-white text-3xl md:text-5xl font-bold">
        {{ venues[currentIndex]?.name || "" }}
      </h1>
      <p v-if="venues[currentIndex]" class="hidden md:block text-white mt-2">
        {{ venues[currentIndex]?.location.country || "" }},
        {{ venues[currentIndex]?.location.city || "" }}
      </p>
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div
          class="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"
        ></div>
      </div>
      <p v-else-if="error" class="text-red-500">{{ error }}</p>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { venueService } from "../api/venueService";
import Navbar from "../components/layout/Navbar.vue";
import Filterbar from "../components/layout/Filterbar.vue";

const props = defineProps({
  id: String,
});

const venue = ref(null);

onMounted(async () => {
  venue.value = await venueService.getVenueById(props.id);
});
</script>

<template>
  <Navbar />
  <div v-if="venue" class="container mt-12">
    <Filterbar />
    <div class="flex flex-col gap-4 items-start">
      <img
        :src="venue.media?.[0]?.url || '/placeholder.jpg'"
        :alt="venue.name"
        class="w-full object-cover"
      />
      <div class="mt-2">
        <div class="flex flex-col gap-">
          <h1>{{ venue.name }}</h1>
          <h2>{{ venue.location?.city }}, {{ venue.location?.country }}</h2>
          <p class="flex items-center gap-1">
            <span
              v-for="n in 5"
              :key="n"
              :class="n <= venue.rating ? 'text-yellow-400' : 'text-gray-300'"
            >
              ★
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="mt-12">
      <div class="flex flex-col gap-8">
        <div>
          <p class="font-bold mb-2">Description:</p>
          <p>{{ venue.description }}</p>
        </div>
        <div class="flex gap-4">
          <p class="font-bold">{{ venue.price }} NOK / night</p>
          <p class="font-bold">Max Guests: {{ venue.maxGuests }}</p>
        </div>
      </div>
      <div class="mt-4">
        <p class="font-bold mb-2">Facilities:</p>
        <ul class="flex flex-col gap-1">
          <li v-if="venue.meta.wifi" class="flex items-center gap-2">
            ✅ Wifi
          </li>
          <li v-if="venue.meta.parking" class="flex items-center gap-2">
            ✅ Parking
          </li>
          <li v-if="venue.meta.breakfast" class="flex items-center gap-2">
            ✅ Breakfast
          </li>
          <li v-if="venue.meta.pets" class="flex items-center gap-2">
            ✅ Pets allowed
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-2 mt-12">
        <p>Venue created: {{ venue.created }}</p>
        <p>Last updated: {{ venue.updated }}</p>
      </div>
    </div>
    <div></div>
  </div>
</template>

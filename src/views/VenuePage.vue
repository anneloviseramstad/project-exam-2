<script setup>
import { ref, onMounted } from "vue";
import { venueService } from "../api/venueService";

import Navbar from "../components/layout/Navbar.vue";
import Filterbar from "../components/layout/Filterbar.vue";
import BookingForm from "../components/booking/BookingForm.vue";

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
        class="w-full object-contain"
      />
      <h1 class="text-3xl font-bold">{{ venue.name }}</h1>
      <p class="text-gray-600">
        {{ venue.location.city }}, {{ venue.location.country }}
      </p>
    </div>
    <div class="flex gap-20 items-start mt-12">
      <div class="w-1/2">
        <p class="font-bold mb-2">Description:</p>
        <p>{{ venue.description }}</p>
        <p class="font-bold mt-6 mb-2">Facilities:</p>
        <ul>
          <li v-if="venue.meta.wifi">Wifi</li>
          <li v-if="venue.meta.parking">Parking</li>
          <li v-if="venue.meta.breakfast">Breakfast</li>
          <li v-if="venue.meta.pets">Pets allowed</li>
        </ul>
      </div>
      <div class="w-1/2 p-6 bg-white shadow rounded-xl border">
        <BookingForm
          :venueId="venue.id"
          :price="venue.price"
          :maxGuests="venue.maxGuests"
        />
      </div>
    </div>
  </div>
</template>

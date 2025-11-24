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
        class="w-full object-contain"
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
    <div></div>
    <div class="flex gap-20 items-start mt-12">
      <div class="w-1/2">
        <div class="flex flex-col gap-8">
          <div>
            <p class="font-bold mb-2">Description:</p>
            <p>{{ venue.description }}</p>
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
          <p class="text-sm text-gray-400">
            Venue created: {{ venue.created }}
          </p>
          <p class="text-sm text-gray-400">Last updated: {{ venue.updated }}</p>
        </div>
      </div>
      <div
        class="w-1/2 p-6 bg-white shadow-md rounded-xl border border-gray-200"
      >
        <p class="text-xl font-semibold mb-8">{{ venue.price }} NOK / night</p>
        <form @submit.prevent="bookVenue" class="flex flex-col gap-4">
          <div>
            <label for="startDate" class="block font-medium mb-1">From:</label>
            <input
              type="date"
              id="startDate"
              v-model="startDate"
              class="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label for="endDate" class="block font-medium mb-1">To:</label>
            <input
              type="date"
              id="endDate"
              v-model="endDate"
              :min="startDate"
              class="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label for="guests" class="block font-medium mb-1">Guests:</label>
            <input
              type="number"
              id="guests"
              v-model.number="guests"
              min="1"
              :max="venue.maxGuests"
              class="w-full border border-gray-300 rounded-md p-2"
              required
            />
            <p class="text-sm text-gray-500">
              Max: {{ venue.maxGuests }} guests
            </p>
          </div>
          <button type="submit" class="btn">Book Now</button>
        </form>
      </div>
    </div>
  </div>
</template>

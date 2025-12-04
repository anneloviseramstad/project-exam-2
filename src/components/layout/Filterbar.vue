<script setup>
import { ref } from "vue";
import { venueService } from "../../api/venueService";
import { bookingService } from "../../api/bookingService";
import VenueCard from "../venue/VenueCard.vue";

const location = ref("");
const checkIn = ref("");
const checkOut = ref("");
const guests = ref(1);

const results = ref([]);
const loading = ref(false);
const error = ref("");
const hasSearched = ref(false);

async function searchVenues() {
  hasSearched.value = true;
  loading.value = true;
  error.value = "";
  results.value = [];

  try {
    const response = await venueService.getAllVenues(1, 100);
    const venues = response.data || [];

    let filtered = venues.filter((venue) => {
      const matchLocation = location.value
        ? venue.location?.city
            ?.toLowerCase()
            .includes(location.value.toLowerCase())
        : true;
      const matchGuests = guests.value
        ? Number(venue.maxGuests) >= guests.value
        : true;
      return matchLocation && matchGuests;
    });

    if (checkIn.value && checkOut.value) {
      const checkInDate = new Date(checkIn.value);
      const checkOutDate = new Date(checkOut.value);
      const bookingsList = await Promise.all(
        filtered.map((venue) => bookingService.getBookingsByVenue(venue.id))
      );

      filtered = filtered.filter((venue, idx) => {
        const bookings = bookingsList[idx] || [];
        return !bookings.some((b) => {
          const from = new Date(b.dateFrom);
          const to = new Date(b.dateTo);
          return checkInDate <= to && checkOutDate >= from;
        });
      });
    }

    results.value = filtered;
  } catch (err) {
    console.error("API error:", err);
    error.value = "Error loading venues. Try again later.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="mx-auto py-4 max-w-6xl px-4">
    <div
      class="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
    >
      <div class="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 11c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          />
        </svg>
        <input
          v-model="location"
          type="text"
          placeholder="Where to?"
          class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:outline-none shadow-sm hover:shadow-md transition"
        />
      </div>
      <div class="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <input
          v-model="checkIn"
          type="date"
          :min="new Date().toISOString().split('T')[0]"
          class="appearance-none w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black shadow-sm hover:shadow-md"
        />
      </div>
      <div class="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <input
          v-model="checkOut"
          type="date"
          :min="checkIn || new Date().toISOString().split('T')[0]"
          class="appearance-none w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black shadow-sm hover:shadow-md"
        />
      </div>
      <div class="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.121 17.804A5 5 0 0112 15a5 5 0 016.879 2.804M12 12a5 5 0 100-10 5 5 0 000 10z"
          />
        </svg>
        <input
          v-model.number="guests"
          type="number"
          min="1"
          placeholder="Guests"
          class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:outline-none shadow-sm hover:shadow-md transition"
        />
      </div>
      <button
        @click="searchVenues"
        :disabled="loading"
        class="bg-gray-900 text-white font-semibold rounded-full py-3 px-6 hover:bg-gray-800 transition shadow-md hover:shadow-lg"
      >
        {{ loading ? "Searching..." : "Search" }}
      </button>
    </div>
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    <div
      v-if="results.length"
      class="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <VenueCard v-for="venue in results" :key="venue.id" :venue="venue" />
    </div>
    <p
      v-else-if="hasSearched && !loading && !error"
      class="mt-6 text-gray-400 text-center"
    >
      No results – try another one!
    </p>
  </div>
</template>

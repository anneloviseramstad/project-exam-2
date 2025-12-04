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
  <div class="mx-auto py-4">
    <div
      class="grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-50 p-4 rounded-lg shadow"
    >
      <input
        v-model="location"
        type="text"
        placeholder="Where to?"
        class="bg-secondary p-2"
      />
      <input
        v-model="checkIn"
        type="date"
        placeholder="Check in"
        class="bg-secondary p-2"
      />
      <input
        v-model="checkOut"
        type="date"
        placeholder="Check out"
        class="bg-secondary p-2"
      />
      <input
        v-model.number="guests"
        type="number"
        min="1"
        placeholder="Guests"
        class="bg-secondary p-2"
      />
      <button
        @click="searchVenues"
        :disabled="loading"
        class="bg-black text-white font-semibold rounded-full p-2 hover:bg-gray-500 transition hover:cursor-pointer"
      >
        {{ loading ? "Searching..." : "Search" }}
      </button>
    </div>
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    <div v-if="results.length" class="mt-6 grid grid-cols-2 gap-4">
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

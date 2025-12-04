<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../store/userStore";
import { useUiStore } from "../store/ui";
import { useRouter } from "vue-router";
import { venueService } from "../api/venueService";

import {
  CalendarIcon,
  UsersIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";

const userStore = useUserStore();
const uiStore = useUiStore();
const router = useRouter();

const venues = ref([]);
const loading = ref(false);

onMounted(async () => {
  if (!userStore.isLoggedIn || userStore.role !== "manager") {
    uiStore.setMessage("Access denied.", "Error");
    return router.push({ name: "Home" });
  }

  loading.value = true;
  try {
    const rawVenues = await venueService.getVenuesByProfile(userStore.username);

    venues.value = await Promise.all(
      rawVenues.map(async (v) => {
        const fullVenue = await venueService.getVenueWithBookings(v.id);
        return fullVenue;
      })
    );
  } catch (err) {
    uiStore.setError("Failed to load venues");
  } finally {
    loading.value = false;
  }
});

async function deleteVenue(id) {
  const confirmed = confirm("Are you sure you want to delete this venue?");
  if (!confirmed) return;

  try {
    await venueService.deleteVenue(id);
    venues.value = venues.value.filter((v) => v.id !== id);
    uiStore.setMessage("Venue deleted successfully.", "Warning");
  } catch (err) {
    uiStore.setError("Failed to delete venue");
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("no-NO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
</script>

<template>
  <div v-if="userStore.user.banner?.url" class="w-full overflow-hidden">
    <img
      :src="userStore.user.banner.url"
      :alt="userStore.user.banner.alt"
      class="w-full h-40 md:h-60 object-cover"
    />
  </div>
  <div v-if="userStore.user" class="container mx-auto my-8 px-2 space-y-8">
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      <div class="flex items-center gap-4">
        <img
          :src="userStore.user.avatar?.url"
          :alt="userStore.user.avatar?.alt"
          class="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h2 class="text-2xl font-semibold">{{ userStore.user.name }}</h2>
          <p class="text-gray-600">{{ userStore.user.email }}</p>
          <p class="text-gray-700">
            {{ userStore.user.venueManager ? "Venue Manager" : "Customer" }}
          </p>
        </div>
      </div>
      <div class="flex gap-4">
        <button
          @click="$router.push({ name: 'EditProfile' })"
          class="px-4 py-2 bg-gray-900 rounded-full font-medium text-white rounded hover:bg-white hover:text-black hover:border"
        >
          Edit Profile
        </button>
        <router-link
          to="/manager-only/create"
          class="px-4 py-2 bg-white border border-gray-400 text-black font-medium rounded-full hover:bg-gray-900 hover:text-white"
        >
          + Add New Venue
        </router-link>
      </div>
    </div>
    <div v-if="userStore.user.bio" class="mt-4">
      <h3 class="text-lg font-medium mb-1">Bio</h3>
      <p>{{ userStore.user.bio }}</p>
    </div>
    <div class="space-y-6 mt-6">
      <h2 class="text-2xl font-medium my-4">My Venues</h2>

      <div v-if="loading" class="text-gray-600">Loading venues...</div>
      <div v-else-if="venues.length === 0" class="text-gray-600">
        You have no venues yet.
      </div>
      <ul v-else class="space-y-4">
        <li
          v-for="venue in venues"
          :key="venue.id"
          class="flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm p-4 rounded bg-white"
        >
          <div class="flex flex-col md:flex-row md:items-center gap-4">
            <img
              :src="venue.media?.[0]?.url || '/placeholder.jpg'"
              :alt="venue.name"
              class="w-28 h-20 object-cover rounded"
            />
            <div>
              <p class="font-semibold text-lg">{{ venue.name }}</p>
              <p class="text-gray-500">{{ venue.location?.city }}</p>
            </div>
          </div>
          <div
            class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mt-3 md:mt-0"
          >
            <router-link
              :to="`/manager-only/edit/${venue.id}`"
              class="text-black hover:text-yellow-800 font-semibold"
            >
              Edit
            </router-link>
            <button
              class="text-red-600 hover:text-red-800 font-semibold text-left"
              @click="deleteVenue(venue.id)"
            >
              Delete
            </button>
            <div v-if="venue.bookings?.length" class="mt-3 text-sm">
              <h4 class="font-medium mb-1">Upcoming bookings:</h4>
              <ul class="space-y-1">
                <li v-for="b in venue.bookings" :key="b.id">
                  <span
                    >{{ formatDate(b.dateFrom) }} →
                    {{ formatDate(b.dateTo) }}</span
                  >
                  ({{ b.guests }} guests)
                </li>
              </ul>
            </div>
            <div v-else class="mt-3 text-sm text-gray-500">
              No bookings yet.
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="text-center py-10">
    <p>Please log in to see your profile.</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "../store/userStore";
import { useRouter } from "vue-router";
import { bookingService } from "../api/bookingService";
import { useUiStore } from "../store/ui";
import {
  CalendarIcon,
  UsersIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";

/**
 * Displays the logged-in user's profile, bio, account type, and bookings.
 * Allows the user to edit their profile and cancel bookings.
 */

const userStore = useUserStore();
const uiStore = useUiStore();
const router = useRouter();

const bookings = ref([]);
const loadingBookings = ref(false);

/**
 * Formats a date string into a readable format.
 * @param {string} dateStr - Date string to format.
 * @returns {string} Formatted date (e.g., 7 Dec 2025).
 */
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("no-NO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Calculates the number of nights between two dates.
 * @param {string|Date} from - Start date.
 * @param {string|Date} to - End date.
 * @returns {number} Number of nights.
 */
function calculateNights(from, to) {
  const start = new Date(from);
  const end = new Date(to);
  return (end - start) / (1000 * 60 * 60 * 24);
}

/**
 * Fetches the current user's bookings when the component is mounted.
 * Redirects to login if the user is not logged in.
 */
onMounted(async () => {
  if (!userStore.isLoggedIn) return router.push("/auth?tab=login");

  if (!userStore.user) {
    await userStore.fetchProfile();
  }

  if (userStore.user) {
    loadingBookings.value = true;
    try {
      bookings.value = await bookingService.getBookingsByUser(
        userStore.user.name
      );
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      loadingBookings.value = false;
    }
  }
});

/**
 * Cancels a booking after confirmation and updates the bookings list.
 * @param {string} bookingId - ID of the booking to cancel.
 */
async function cancelBooking(bookingId) {
  const confirmed = confirm("Are you sure you want to cancel your booking?");
  if (!confirmed) return;

  try {
    await bookingService.cancelBooking(bookingId);

    bookings.value = bookings.value.filter((b) => b.id !== bookingId);

    uiStore.setMessage("You have now cancelled your booking.", "Warning");
  } catch (err) {
    console.error("Could not cancel booking:", err);
    uiStore.setError("Failed to cancel booking");
  }
}
</script>

<template>
  <div v-if="userStore.user">
    <div v-if="userStore.user.banner?.url" class="w-full overflow-hidden">
      <img
        :src="userStore.user.banner.url"
        :alt="userStore.user.banner.alt"
        class="w-full h-40 md:h-60 object-cover"
      />
    </div>

    <div class="container mx-auto my-8 px-4">
      <h1>Profile</h1>
      <div>
        <div v-if="!userStore.user">Loading profile...</div>
        <div v-else class="space-y-6">
          <div class="flex items-center gap-4">
            <img
              :src="userStore.user.avatar?.url"
              :alt="userStore.user.avatar?.alt"
              class="w-20 h-20 rounded-full object-cover border"
            />
            <div>
              <h2 class="text-2xl font-semibold">{{ userStore.user.name }}</h2>
              <p class="text-gray-600">{{ userStore.user.email }}</p>
            </div>
          </div>
          <div class="mt-4 flex items-center gap-4">
            <button
              @click="$router.push({ name: 'EditProfile' })"
              class="px-4 py-2 bg-gray-900 rounded-full font-medium text-white rounded hover:bg-white hover:text-black hover:border"
            >
              Edit Profile
            </button>
          </div>

          <div v-if="userStore.user.bio">
            <h3 class="text-lg font-medium mb-1">Bio</h3>
            <p>{{ userStore.user.bio }}</p>
          </div>
          <div class="mt-4">
            <h3 class="text-lg font-medium">Account Type</h3>
            <p class="text-gray-700">
              {{
                userStore.user.venueManager || userStore.user.venue_manager
                  ? "Venue Manager"
                  : "Customer"
              }}
            </p>
          </div>
          <div class="flex gap-10 mt-6">
            <div>
              <span class="font-bold">{{ bookings.length }}</span>
              <span class="text-gray-600 ml-1">Bookings</span>
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-6 my-12">
        <h2 class="text-2xl font-medium my-4">My Bookings</h2>
        <div v-if="loadingBookings" class="text-gray-600">
          Loading bookings...
        </div>
        <div v-else-if="bookings.length === 0" class="text-gray-600">
          You have no bookings yet.
        </div>
        <ul v-else class="space-y-4">
          <li
            v-for="booking in bookings"
            :key="booking.id"
            class="flex flex-col lg:flex-row justify-between items-start lg:items-center shadow-sm bg-white p-4"
          >
            <div
              class="flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
            >
              <img
                :src="booking.venue.media?.[0]?.url || '/placeholder.jpg'"
                :alt="booking.venue.name"
                class="w-28 h-20 object-cover"
              />
              <div class="flex flex-col gap-1">
                <p class="font-semibold text-lg">{{ booking.venue.name }}</p>
                <p class="text-gray-500 text-sm">
                  {{ booking.venue.location?.city }}
                </p>
              </div>
            </div>
            <div
              class="flex flex-col sm:flex-row sm:items-center gap-4 mt-3 md:mt-0"
            >
              <div class="flex items-center gap-1 text-gray-600">
                <CalendarIcon class="w-5 h-5" aria-hidden="true" />
                <span
                  >{{ formatDate(booking.dateFrom) }} →
                  {{ formatDate(booking.dateTo) }}</span
                >
              </div>
              <div class="flex items-center gap-1 text-gray-600">
                <UsersIcon class="w-5 h-5" aria-hidden="true" />
                <span>{{ booking.guests }} guests</span>
              </div>
              <div class="flex items-center gap-1 font-semibold">
                <CurrencyDollarIcon class="w-5 h-5" aria-hidden="true" />
                <span
                  >{{
                    calculateNights(booking.dateFrom, booking.dateTo) *
                    booking.venue.price
                  }}
                </span>
              </div>
            </div>
            <button
              class="mt-2 md:mt-0 text-red-600 hover:text-red-800 font-semibold"
              @click="cancelBooking(booking.id)"
            >
              Cancel
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-10">
    <p>Please log in to see your profile.</p>
  </div>
</template>

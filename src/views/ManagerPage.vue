<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../store/userStore";
import { useUiStore } from "../store/ui";
import { useRouter } from "vue-router";
import { venueService } from "../api/venueService";

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
    venues.value = await venueService.getVenuesByProfile(userStore.username);
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
</script>

<template>
  <div class="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-8">
    <h1 class="text-3xl font-bold">Manager Dashboard</h1>

    <div class="flex justify-end">
      <router-link
        to="/manager-only/create"
        class="btn px-6 py-2 bg-primary-600 text-white rounded"
      >
        Add New Venue
      </router-link>
    </div>

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

        <div class="flex gap-4 mt-3 md:mt-0">
          <router-link
            :to="`/manager-only/edit/${venue.id}`"
            class="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Edit
          </router-link>
          <button
            class="text-red-600 hover:text-red-800 font-semibold"
            @click="deleteVenue(venue.id)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

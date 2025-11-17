<script setup>
import { ref, onMounted } from "vue";
import { venueService } from "../../api/venueService";
import VenuesListView from "./VenuesListView.vue";
import { uiStore } from "../../store/ui";
import { handleApiCall } from "../../store/handleAPICall";

const venues = ref([]);

const fetchVenues = async () => {
  uiStore.setLoading(true);

  try {
    venues.value = await handleApiCall(() => venueService.getAllVenues());
  } catch (err) {
    uiStore.setError("Failed to fetch venues.");
  } finally {
    uiStore.setLoading(false);
  }
};

onMounted(fetchVenues);
</script>

<template>
  <div>
    <p v-if="uiStore.error" class="text-red-500">{{ uiStore.error }}</p>
    <VenuesListView v-else :venues="venues" />
  </div>
</template>

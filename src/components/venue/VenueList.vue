<script setup>
import { ref, onMounted } from "vue";
import { venueService } from "../../api/venueService";
import VenuesListView from "./VenuesListView.vue";
import { uiStore } from "../../store/ui";

const venues = ref([]);
const localError = ref(null);

const fetchVenues = async () => {
  uiStore.setLoading(true);
  localError.value = null;

  try {
    const data = await venueService.getAllVenues();
    venues.value = data;
  } catch (error) {
    console.error(error);
    uiStore.setError("Failed to fetch venues.");
    localError.value = "Failed to fetch venues. Please try again.";
  } finally {
    uiStore.setLoading(false);
  }
};

onMounted(() => {
  fetchVenues();
});
</script>

<template>
  <div>
    <h1>Book Your Next Stay</h1>
    <VenuesListView :venues="venues" :error="localError" />
  </div>
</template>

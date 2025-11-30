<script setup>
import { ref, onMounted } from "vue";
import VenuesListView from "./VenuesListView.vue";
import { venueService } from "../../api/venueService";
import { useUiStore } from "../../store/ui";

const venues = ref([]);
const loading = ref(true);
const error = ref(null);
const uiStore = useUiStore();

onMounted(async () => {
  loading.value = true;
  try {
    venues.value = await venueService.getAllVenues();
  } catch (err) {
    error.value = "Could not load venues";
    uiStore.setError("Could not load venues");
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <VenuesListView :venues="venues" :loading="loading" :error="error" />
</template>

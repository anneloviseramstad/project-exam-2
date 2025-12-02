<script setup>
import { ref, onMounted } from "vue";
import VenuesListView from "./VenuesListView.vue";
import { venueService } from "../../api/venueService";
import { useUiStore } from "../../store/ui";

const venues = ref([]);
const loading = ref(true);
const error = ref(null);
const uiStore = useUiStore();
const currentPage = ref(1);
const totalPages = ref(1);
const limit = 10;

async function fetchVenues(page = 1) {
  loading.value = true;
  try {
    const response = await venueService.getAllVenues(page, limit);
    venues.value = response.data;
    totalPages.value = response.meta.pageCount || 1;
  } catch (err) {
    error.value = "Could not load venues";
    uiStore.setError("Could not load venues");
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchVenues(currentPage.value);
});

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  fetchVenues(page);
}
</script>

<template>
  <VenuesListView :venues="venues" :loading="loading" :error="error" />
  <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-4">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 border rounded"
    >
      Prev
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 border rounded"
    >
      Next
    </button>
  </div>
</template>

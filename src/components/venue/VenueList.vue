<script setup>
import { ref, onMounted } from "vue";
import VenuesListView from "./VenuesListView.vue";
import { venueService } from "../../api/venueService";
import { useUiStore } from "../../store/ui";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/vue/24/outline";

const venues = ref([]);
const loading = ref(true);
const error = ref(null);
const uiStore = useUiStore();
const currentPage = ref(1);
const totalPages = ref(1);
const limit = 12;

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

  <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-12">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full disabled:opacity-50"
    >
      <ArrowLeftIcon class="w-5 h-5" />
    </button>

    <span class="flex items-center"
      >Page {{ currentPage }} of {{ totalPages }}</span
    >

    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full disabled:opacity-50"
    >
      <ArrowRightIcon class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  venue: Object,
});

const router = useRouter();

function goToVenue() {
  router.push(`/venues/${props.venue.id}`);
}
</script>

<template v-if="venue">
  <div class="card" @click="goToVenue">
    <img
      :src="venue.media?.[0]?.url || '/placeholder.jpg'"
      :alt="venue.name"
      class="card-img"
    />
    <div class="py-4">
      <h3 class="font-semibold text-md">{{ venue.name }}</h3>
      <p class="text-gray-600 text-sm">{{ venue.location?.city }}</p>
      <p class="font-bold mt-2">{{ venue.price }} NOK / natt</p>
    </div>
  </div>
</template>

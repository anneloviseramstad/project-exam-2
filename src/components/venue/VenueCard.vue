<script setup>
import { useRouter } from "vue-router";
import { MapPinIcon } from "@heroicons/vue/24/outline";

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
      <h3 class="font-medium text-md px-4">{{ venue.name }}</h3>
      <div class="flex items-center px-4 py-2">
        <MapPinIcon class="h-5 w-5 text-gray-500" />
        <p class="text-gray-600 text-sm">{{ venue.location?.city }}</p>
      </div>
      <div class="flex gap-2 px-4 mt-2 mb-4">
        <p
          class="text-gray-600 text-sm px-4 py-1 border border-gray-300 rounded-full"
        >
          {{ venue.maxGuests }} guests
        </p>
        <p
          class="text-gray-600 text-sm px-4 py-1 border border-gray-300 rounded-full"
        >
          {{ venue.rating }} points
        </p>
      </div>
      <hr class="text-gray-300" />
      <div class="flex justify-between px-4 items-center">
        <p class="font-medium mt-2">${{ venue.price }}</p>
        <p class="text-gray-500 text-sm">per night</p>
      </div>
    </div>
  </div>
</template>

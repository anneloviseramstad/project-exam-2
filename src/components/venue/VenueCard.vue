<script setup>
import { useRouter } from "vue-router";
import { MapPinIcon, UserIcon } from "@heroicons/vue/24/outline";
import { StarIcon } from "@heroicons/vue/24/solid";

/**
 * VenueCard component that displays a summary card for a single venue.
 * Shows venue image, name, location, maximum guests, rating, and price.
 * Clicking the card navigates to the venue's detail page.
 *
 * Props:
 * @prop {Object} venue - The venue object containing details like id, name,
 *   media, location, maxGuests, rating, and price.
 */

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
      :alt="`${venue.name}, ${venue.location?.city}`"
      class="card-img"
    />
    <div class="py-4">
      <p class="font-medium text-md px-4">{{ venue.name }}</p>
      <div class="flex items-center px-4 py-2">
        <MapPinIcon class="h-5 w-5 text-gray-500" aria-hidden="true" />
        <p class="text-gray-600 text-sm">{{ venue.location?.city }}</p>
      </div>
      <div class="flex gap-4 px-4 mt-2 mb-4">
        <div
          class="flex items-center gap-1 text-gray-600 text-sm px-3 py-1 border border-gray-300 rounded-full"
        >
          <UserIcon class="w-4 h-4" aria-hidden="true" />
          <span>{{ venue.maxGuests }}</span>
        </div>
        <div
          class="flex items-center gap-1 text-gray-600 text-sm px-3 py-1 border border-gray-300 rounded-full"
        >
          <StarIcon class="w-4 h-4 text-yellow-500" aria-hidden="true" />
          <span>{{ venue.rating }}</span>
        </div>
      </div>
      <hr class="text-gray-300" />
      <div class="flex justify-between px-4 items-center">
        <p class="font-medium mt-2">${{ venue.price }}</p>
        <p class="text-gray-500 text-sm">per night</p>
      </div>
    </div>
  </div>
</template>

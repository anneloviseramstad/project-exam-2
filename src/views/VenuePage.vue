<script setup>
import { ref, onMounted, reactive } from "vue";
import { venueService } from "../api/venueService";
import BookingForm from "../components/booking/BookingForm.vue";
import { CheckIcon, XMarkIcon, StarIcon } from "@heroicons/vue/24/solid";

/**
 * VenueDetail.vue
 *
 * Displays detailed information for a single venue, including description,
 * location, rating, facilities, and a booking form.
 */

const props = defineProps({
  id: String,
});

const venue = ref(null);

onMounted(async () => {
  venue.value = await venueService.getVenueById(props.id);
});

const facilities = [
  { key: "wifi", label: "WiFi" },
  { key: "parking", label: "Parking" },
  { key: "breakfast", label: "Breakfast" },
  { key: "pets", label: "Pets allowed" },
];

const icons = { CheckIcon, XMarkIcon };
</script>

<template>
  <main>
    <div v-if="venue">
      <img
        :src="venue.media?.[0]?.url || '/placeholder.jpg'"
        class="w-full object-cover overflow-hidden h-[30vh] md:h-[50vh]"
      />
      <div class="container mx-auto mt-8 px-4">
        <div class="flex flex-col">
          <div class="flex flex-row items-center justify-between">
            <h1>{{ venue.name }}</h1>
            <div
              class="flex items-center gap-1 text-gray-600 text-sm px-3 py-1"
            >
              <StarIcon class="w-4 h-4 text-yellow-500" aria-hidden="true" />
              <span>{{ venue.rating }}</span>
            </div>
          </div>
          <p class="text-gray-600">
            {{ venue.location.city }}, {{ venue.location.country }}
          </p>
        </div>
        <div
          class="flex flex-col md:flex-row gap-12 md:gap-20 items-start mt-8 md:mt-12"
        >
          <div class="md:w-1/2 space-y-12">
            <p class="font-bold mb-2">Description:</p>
            <div class="space-y-4">
              <p
                v-for="(paragraph, index) in venue.description.split('\n')"
                :key="index"
              >
                {{ paragraph }}
              </p>
            </div>
            <div class="flex flex-col gap-4 mt-2">
              <div
                v-for="f in facilities"
                :key="f.key"
                class="flex items-center gap-1 px-4 py-1 border rounded"
              >
                <component
                  :is="venue.meta[f.key] ? icons.CheckIcon : icons.XMarkIcon"
                  class="w-5 h-5"
                  :class="venue.meta[f.key] ? 'text-green-500' : 'text-red-500'"
                />
                <span class="text-sm">{{ f.label }}</span>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 p-4 bg-white shadow-xl rounded-lg">
            <BookingForm
              :venueId="venue.id"
              :price="venue.price"
              :maxGuests="venue.maxGuests"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

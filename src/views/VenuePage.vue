<script setup>
import { ref, onMounted, reactive } from "vue";
import { venueService } from "../api/venueService";
import Navbar from "../components/layout/Navbar.vue";
import Filterbar from "../components/layout/Filterbar.vue";
import BookingForm from "../components/booking/BookingForm.vue";
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/solid";

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
  <Navbar />
  <div v-if="venue" class="container mt-12">
    <Filterbar />
    <div class="flex flex-col gap-4 items-start">
      <img
        :src="venue.media?.[0]?.url || '/placeholder.jpg'"
        class="w-full object-contain"
      />
      <h1 class="text-3xl font-bold">{{ venue.name }}</h1>
      <p class="text-gray-600">
        {{ venue.location.city }}, {{ venue.location.country }}
      </p>
    </div>
    <div class="flex gap-20 items-start mt-12">
      <div class="w-1/2">
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
            class="flex items-center gap-1 px-2 py-1 border rounded"
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
      <div class="w-1/2 p-6 bg-white shadow rounded-xl border">
        <BookingForm
          :venueId="venue.id"
          :price="venue.price"
          :maxGuests="venue.maxGuests"
        />
      </div>
    </div>
  </div>
</template>

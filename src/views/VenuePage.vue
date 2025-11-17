<script setup>
import { onMounted, ref } from "vue";
import { venueService } from "../api/venueService";
import Filterbar from "../components/layout/Filterbar.vue";

const props = defineProps({
  id: String,
});

const venue = ref(null);

onMounted(async () => {
  venue.value = await venueService.getVenueById(props.id);
});
</script>

<template>
  <Filterbar />
  <div v-if="venue">
    <div class="container flex flex-col gap-8">
      <img
        :src="venue.media?.[0]?.url || '/placeholder.jpg'"
        :alt="venue.name"
        class="w-full object-cover"
      />
      <div>
        <h1>{{ venue.name }}</h1>
        <h2>{{ venue.location?.city }}, {{ venue.location?.country }}</h2>
        <p class="font-bold">{{ venue.price }} NOK / night</p>
        <p class="font-bold">Max Guests: {{ venue.maxGuests }}</p>
      </div>
      <div>
        <p>{{ venue.description }}</p>
        <p>Venue created: {{ venue.created }}</p>
        <p>Last updated: {{ venue.updated }}</p>
        <p>Rating: {{ venue.rating }}</p>
      </div>
    </div>
  </div>
</template>

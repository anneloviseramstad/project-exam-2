<script setup>
import { venueService } from "../api/venueService";
import Filterbar from "../components/layout/Filterbar.vue";
import VenueList from "../components/venue/VenueList.vue";
</script>

<template>
  <main>
    <Filterbar />
    <h1>Find and Book the Perfect Venue</h1>
    <VenueList />
  </main>
</template>

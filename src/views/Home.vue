<script setup>
import VenueList from "../components/venue/VenueList.vue";
import Filterbar from "../components/layout/Filterbar.vue";
</script>

<template>
  <div class="container">
    <div class="text-center flex flex-col gap-4">
      <h1>The Easiest Way To Book Your Stay</h1>
      <h2>
        At Holidaze, we make finding and booking the perfect stay effortless.
        Browse a wide range of venues, compare options, and secure your
        reservation with ease – all in one convenient place.
      </h2>
    </div>
    <div class="py-4 md:py-12">
      <Filterbar />
      <h3>Book Your Next Stay</h3>
      <VenueList />
    </div>
  </div>
</template>

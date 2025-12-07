<script setup>
import Filterbar from "../components/layout/Filterbar.vue";
import Header from "../components/layout/Header.vue";
import FeaturedGrid from "../components/layout/FeaturedGrid.vue";
import VenueList from "../components/venue/VenueList.vue";
</script>

<template>
  <Header />
  <h1 class="text-center mt-8">Find the perfect venue for your special day</h1>
  <FeaturedGrid />
  <Filterbar />
  <h2 class="text-center">Discover Spaces for Every Occasion</h2>
  <VenueList />
</template>

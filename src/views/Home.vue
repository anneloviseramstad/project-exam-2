<script setup>
import Navbar from "../components/layout/Navbar.vue";
import Filterbar from "../components/layout/Filterbar.vue";
import Header from "../components/layout/Header.vue";
import FeaturedGrid from "../components/layout/FeaturedGrid.vue";
import VenueList from "../components/venue/VenueList.vue";
</script>

<template>
  <Navbar />
  <Header />
  <main class="container">
    <Filterbar />
    <FeaturedGrid />
    <h2 class="text-3xl font-medium">Handpicked Venues Across the Globe</h2>
    <VenueList />
  </main>
</template>

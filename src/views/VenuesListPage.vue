<script setup>
import Navbar from "../components/layout/Navbar.vue";
import Filterbar from "../components/layout/Filterbar.vue";
import VenueList from "../components/venue/VenueList.vue";
</script>

<template>
  <Navbar />
  <main class="container mx-auto pt-24">
    <div class="container">
      <h1>Choose from a variety of amazing venues below</h1>
      <h2>
        Find the perfect place for your next getaway, whether you’re looking for
        a cozy cabin, a luxurious resort, or a unique experience — explore our
        curated selection of venues to match every taste and budget.
      </h2>
      <Filterbar />
      <VenueList />
    </div>
  </main>
</template>

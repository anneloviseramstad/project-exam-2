<script setup>
import Navbar from "../components/layout/Navbar.vue";
import Filterbar from "../components/layout/Filterbar.vue";
import Header from "../components/layout/Header.vue";
import VenueList from "../components/venue/VenueList.vue";
</script>

<template>
  <Navbar />
  <Header />
  <main class="container">
    <Filterbar />
    <h1 class="heading">Book Your Next Stay</h1>
    <VenueList />
  </main>
</template>

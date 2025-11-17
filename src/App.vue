<template>
  <Navbar />
  <Loader />
  <Error />
  <router-view />
  <Footer />
</template>

<script setup>
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";
import Loader from "./components/global/Loader.vue";
import Error from "./components/global/Error.vue";
</script>

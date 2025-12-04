<script setup>
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";
import Loader from "./components/global/Loader.vue";
import UiNotification from "./components/global/UiNotification.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <Loader />
    <UiNotification />
    <div class="flex-1">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

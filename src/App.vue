<script setup>
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";
import Loader from "./components/global/Loader.vue";
import Error from "./components/global/Error.vue";
import BookingConfirmation from "./components/booking/BookingConfirmation.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <Loader />
    <Error />
    <BookingConfirmation />
    <main class="md:pt-18 flex-1">
      <router-view />
    </main>
    <Footer class="mt-auto" />
  </div>
</template>

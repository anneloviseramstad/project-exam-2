<template>
  <Loader />
  <Error />
  <router-view />
</template>

<script setup>
import Loader from "./components/global/Loader.vue";
import Error from "./components/global/Error.vue";
</script>

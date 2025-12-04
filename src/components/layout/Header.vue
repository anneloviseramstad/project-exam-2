<template>
  <header
    class="relative min-h-[60vh] bg-cover bg-center shadow flex items-center"
    style="
      background-image: url('https://images.unsplash.com/photo-1554205163-beedc3a3e9fd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    "
  >
    <div class="absolute inset-0 bg-black/60"></div>
    <div class="relative mx-auto max-w-6xl w-full px-4 md:px-8 pt-32">
      <div class="max-w-[500px] flex flex-col gap-4">
        <h1 class="text-white text-3xl md:text-5xl font-medium leading-tight">
          Explore the Hidden Corners of the World
        </h1>

        <p class="text-white text-base md:text-xl">
          Find your perfect location for events, meetings, and adventures.
        </p>

        <button class="btn my-8 w-fit" @click="$router.push('/venues')">
          GET STARTED
        </button>
      </div>
    </div>
  </header>
</template>

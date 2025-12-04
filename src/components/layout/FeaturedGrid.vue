<script setup>
import { ref, onMounted } from "vue";
import { venueService } from "../../api/venueService";
import { ArrowUpRightIcon } from "@heroicons/vue/24/outline";

const venues = ref([]);
const loading = ref(false);
const error = ref("");

async function fetchVenues() {
  loading.value = true;
  error.value = "";
  try {
    const response = await venueService.getAllVenues(1, 4);
    const data = response.data || [];

    venues.value = data.filter(
      (v) => Array.isArray(v.media) && v.media.length > 0
    );
  } catch (err) {
    console.error(err);
    error.value = "Error fetching venues.";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchVenues);
</script>

<template>
  <section class="container py-20">
    <div
      class="max-w-6xl grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2"
    >
      <div
        v-if="venues[0]"
        @click="$router.push('/venues/' + venues[0].id)"
        class="relative rounded-xl overflow-hidden cursor-pointer lg:row-span-2 h-full"
      >
        <img :src="venues[0].media[0].url" class="w-full h-full object-cover" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
        ></div>
        <div class="absolute bottom-4 left-4 text-white">
          <h3 class="text-xl font-semibold">{{ venues[0].name }}</h3>
          <p class="text-sm opacity-80">
            {{ venues[0].location.country }}, {{ venues[0].location.city }}
          </p>
        </div>
        <ArrowUpRightIcon
          class="absolute bottom-4 right-4 w-7 h-7 text-white"
        />
      </div>
      <div
        v-if="venues[1]"
        @click="$router.push('/venues/' + venues[1].id)"
        class="relative rounded-xl overflow-hidden cursor-pointer h-48 sm:h-56 lg:h-64"
      >
        <img :src="venues[1].media[0].url" class="w-full h-full object-cover" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
        ></div>

        <div class="absolute bottom-3 left-3 text-white">
          <h3 class="font-semibold">{{ venues[1].name }}</h3>
        </div>
        <ArrowUpRightIcon
          class="absolute bottom-3 right-3 w-6 h-6 text-white"
        />
      </div>
      <div
        v-if="venues[2]"
        @click="$router.push('/venues/' + venues[2].id)"
        class="relative rounded-xl overflow-hidden cursor-pointer h-48 sm:h-56 lg:h-64"
      >
        <img :src="venues[2].media[0].url" class="w-full h-full object-cover" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
        ></div>

        <div class="absolute bottom-3 left-3 text-white">
          <h3 class="font-semibold">{{ venues[2].name }}</h3>
        </div>
        <ArrowUpRightIcon
          class="absolute bottom-3 right-3 w-6 h-6 text-white"
        />
      </div>
      <div
        v-if="venues[3]"
        @click="$router.push('/venues/' + venues[3].id)"
        class="relative rounded-xl overflow-hidden cursor-pointer lg:col-span-2 h-48 sm:h-56 lg:h-64"
      >
        <img :src="venues[3].media[0].url" class="w-full h-full object-cover" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
        ></div>

        <div class="absolute bottom-4 left-4 text-white">
          <h3 class="text-xl font-semibold">{{ venues[3].name }}</h3>
          <p class="text-sm opacity-80">
            {{ venues[3].location.country }}, {{ venues[3].location.city }}
          </p>
        </div>
        <ArrowUpRightIcon
          class="absolute bottom-4 right-4 w-7 h-7 text-white"
        />
      </div>
    </div>
  </section>
</template>

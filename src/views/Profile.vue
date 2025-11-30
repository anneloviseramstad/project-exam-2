<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../store/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

onMounted(async () => {
  if (!userStore.isLoggedIn) {
    return router.push("/auth?tab=login");
  }

  if (!userStore.user) {
    await userStore.fetchProfile();
  }
});
</script>

<template>
  <div class="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <h1 class="text-3xl font-bold mb-6">Profile</h1>

    <div v-if="!userStore.user">Loading profile...</div>

    <div v-else class="space-y-6">
      <div v-if="userStore.user.banner?.url">
        <img
          :src="userStore.user.banner.url"
          :alt="userStore.user.banner.alt"
          class="w-full h-40 object-cover rounded"
        />
      </div>

      <div class="flex items-center gap-4">
        <img
          :src="userStore.user.avatar?.url"
          :alt="userStore.user.avatar?.alt"
          class="w-20 h-20 rounded-full object-cover border"
        />

        <div>
          <h2 class="text-2xl font-semibold">{{ userStore.user.name }}</h2>
          <p class="text-gray-600">{{ userStore.user.email }}</p>
        </div>
      </div>

      <div v-if="userStore.user.bio">
        <h3 class="text-xl font-semibold mb-1">Bio</h3>
        <p>{{ userStore.user.bio }}</p>
      </div>

      <div class="mt-4">
        <h3 class="text-xl font-semibold">Account Type</h3>
        <p class="text-gray-700">
          {{ userStore.user.venueManager ? "Venue Manager" : "Customer" }}
        </p>
      </div>

      <div class="flex gap-10 mt-6">
        <div>
          <span class="font-bold">{{ userStore.user._count?.venues }}</span>
          <span class="text-gray-600 ml-1">Venues</span>
        </div>
        <div>
          <span class="font-bold">{{ userStore.user._count?.bookings }}</span>
          <span class="text-gray-600 ml-1">Bookings</span>
        </div>
      </div>
    </div>
  </div>
</template>

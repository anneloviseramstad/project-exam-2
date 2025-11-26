<script setup>
import { ref } from "vue";
import { useUserStore } from "../../store/userStore";
import { uiStore } from "../../store/ui";

const userStore = useUserStore();

const name = ref("");
const email = ref("");
const password = ref("");
const venueManager = ref(false);
const avatarUrl = ref("");
const bannerUrl = ref("");

const loading = ref(false);
const error = ref(null);

async function handleRegister() {
  loading.value = true;
  error.value = null;
  uiStore.clearError();

  try {
    await userStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      venueManager: venueManager.value,
      avatar: { url: avatarUrl.value, alt: "Avatar" },
      banner: { url: bannerUrl.value, alt: "Banner" },
    });
  } catch (err) {
    error.value = err?.response?.data?.message || "Registration failed";
    uiStore.setError(error.value);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="handleRegister" class="space-y-4">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <label>
        <input type="checkbox" v-model="venueManager" /> Register as Venue
        Manager
      </label>
      <input v-model="avatarUrl" type="url" placeholder="Avatar URL" />
      <input v-model="bannerUrl" type="url" placeholder="Banner URL" />
      <button type="submit" :disabled="loading">
        {{ loading ? "Registering..." : "Register" }}
      </button>
      <div v-if="error" class="text-red-500">{{ error }}</div>
    </form>
  </div>
</template>

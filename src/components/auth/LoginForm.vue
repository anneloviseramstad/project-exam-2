<script setup>
import { ref } from "vue";
import { useUserStore } from "../../store/userStore";
import { uiStore } from "../../store/ui";

const userStore = useUserStore();

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(null);

async function handleLogin() {
  loading.value = true;
  error.value = null;
  uiStore.clearError();

  try {
    await userStore.login({ email: email.value, password: password.value });
  } catch (err) {
    error.value = err?.response?.data?.message || "Login failed";
    uiStore.setError(error.value);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleLogin" class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
      </button>
      <div v-if="error" class="text-red-500">{{ error }}</div>
    </form>
  </div>
</template>

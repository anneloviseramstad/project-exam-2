<script setup>
import { ref } from "vue";
import { useUserStore } from "../../store/userStore";
import { useUiStore } from "../../store/ui";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const uiStore = useUiStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const loading = ref(false);
const fieldErrors = ref({
  email: null,
  password: null,
});

async function handleLogin() {
  loading.value = true;
  fieldErrors.value = { email: null, password: null };

  try {
    await userStore.login({ email: email.value, password: password.value });
    await userStore.fetchProfile();

    uiStore.setMessage("Logged in successfully", "Success");

    if (userStore.role === "manager") {
      router.push({ name: "ManagerPage" });
    } else {
      router.push({ name: "Profile" });
    }
  } catch (err) {
    const apiErrors = err?.response?.data?.errors || [];
    apiErrors.forEach((e) => {
      if (e.message.includes("valid email"))
        fieldErrors.value.email = "Please enter a valid email";
      if (e.message.includes("Password"))
        fieldErrors.value.password = "Incorrect password";
    });

    uiStore.setMessage(uiStore.parseApiError(err), "Error");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin" class="space-y-4">
    <input
      v-model="email"
      type="email"
      placeholder="Email"
      class="w-full p-2 border rounded"
    />
    <p v-if="fieldErrors.email" class="text-red-500 text-sm">
      {{ fieldErrors.email }}
    </p>
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="w-full p-2 border rounded"
    />
    <p v-if="fieldErrors.password" class="text-red-500 text-sm">
      {{ fieldErrors.password }}
    </p>
    <button
      type="submit"
      :disabled="loading"
      class="px-6 py-2 bg-black text-white rounded-full"
    >
      {{ loading ? "Logging in..." : "Login" }}
    </button>
  </form>
</template>

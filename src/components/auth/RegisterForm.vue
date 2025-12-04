<script setup>
import { ref } from "vue";
import { useUserStore } from "../../store/userStore";
import { useUiStore } from "../../store/ui";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const uiStore = useUiStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const venueManager = ref(false);
const avatarUrl = ref("");
const bannerUrl = ref("");
const loading = ref(false);

const fieldErrors = ref({
  name: null,
  email: null,
  password: null,
});

async function handleRegister() {
  loading.value = true;
  fieldErrors.value = { name: null, email: null, password: null };

  try {
    const payload = {
      name: name.value,
      email: email.value,
      password: password.value,
      venueManager: venueManager.value,
    };

    if (avatarUrl.value.trim())
      payload.avatar = { url: avatarUrl.value, alt: "Avatar" };
    if (bannerUrl.value.trim())
      payload.banner = { url: bannerUrl.value, alt: "Banner" };

    await userStore.register(payload);
    await userStore.fetchProfile();

    uiStore.setMessage("Registration successful!", "Success");

    router.push(
      userStore.role === "manager"
        ? { name: "ManagerPage" }
        : { name: "Profile" }
    );
  } catch (err) {
    const apiErrors = err?.response?.data?.errors || [];
    apiErrors.forEach((e) => {
      if (e.message.toLowerCase().includes("email"))
        fieldErrors.value.email = e.message;
      if (e.message.toLowerCase().includes("password"))
        fieldErrors.value.password = e.message;
      if (e.message.toLowerCase().includes("name"))
        fieldErrors.value.name = e.message;
    });
    uiStore.setMessage(uiStore.parseApiError(err), "Error");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="handleRegister" class="space-y-4 max-w-md mx-auto p-4">
    <input
      v-model="name"
      type="text"
      placeholder="Name"
      class="w-full p-2 border rounded"
    />
    <p v-if="fieldErrors.name" class="text-red-500 text-sm">
      {{ fieldErrors.name }}
    </p>
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
    <label class="flex items-center gap-2">
      <input type="checkbox" v-model="venueManager" />
      Register as venue manager
    </label>
    <input
      v-model="avatarUrl"
      type="url"
      placeholder="Avatar URL (optional)"
      class="w-full p-2 border rounded"
    />
    <input
      v-model="bannerUrl"
      type="url"
      placeholder="Banner URL (optional)"
      class="w-full p-2 border rounded"
    />
    <button
      type="submit"
      :disabled="loading"
      class="w-full px-6 py-2 bg-gray-900 text-white rounded-full"
    >
      {{ loading ? "Registering..." : "Register" }}
    </button>
  </form>
</template>

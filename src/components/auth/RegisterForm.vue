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
    await userStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      venueManager: venueManager.value,
      avatar: { url: avatarUrl.value, alt: "Avatar" },
      banner: { url: bannerUrl.value, alt: "Banner" },
    });

    await userStore.fetchProfile();

    uiStore.setMessage("Registration successful!", "Success");

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
      if (e.message.includes("stud.noroff.no"))
        fieldErrors.value.email = "Only stud.noroff.no emails allowed";
      if (e.message.includes("Password"))
        fieldErrors.value.password = "Password must be at least 8 characters";
    });

    uiStore.setMessage("Registration failed", "Error");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="handleRegister" class="space-y-4">
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
      placeholder="Avatar URL"
      class="w-full p-2 border rounded"
    />
    <input
      v-model="bannerUrl"
      type="url"
      placeholder="Banner URL"
      class="w-full p-2 border rounded"
    />
    <button
      type="submit"
      :disabled="loading"
      class="px-6 py-2 bg-primary-500 text-white rounded"
    >
      {{ loading ? "Registering..." : "Register" }}
    </button>
  </form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../store/userStore";
import { useUiStore } from "../store/ui";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const uiStore = useUiStore();
const router = useRouter();

const avatarUrl = ref("");
const bannerUrl = ref("");
const bio = ref("");
const loading = ref(false);

onMounted(() => {
  if (!userStore.user) {
    uiStore.setMessage("Please log in to edit your profile", "Error");
    return router.push("/auth");
  }

  avatarUrl.value = userStore.user.avatar?.url || "";
  bannerUrl.value = userStore.user.banner?.url || "";
  bio.value = userStore.user.bio || "";
});

async function handleEditProfile() {
  loading.value = true;

  const payload = {};
  if (avatarUrl.value.trim())
    payload.avatar = { url: avatarUrl.value, alt: "Avatar" };
  if (bannerUrl.value.trim())
    payload.banner = { url: bannerUrl.value, alt: "Banner" };
  payload.bio = bio.value;

  try {
    await userStore.updateProfile(payload);
    uiStore.setMessage("Profile updated successfully", "Success");
    if (userStore.role === "manager") {
      router.push({ name: "ManagerPage" });
    } else {
      router.push({ name: "Profile" });
    }
  } catch (err) {
    console.error(err);
    uiStore.setMessage("Failed to update profile", "Error");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <h1 class="text-2xl font-bold mb-6">Edit Profile</h1>

    <form @submit.prevent="handleEditProfile" class="space-y-4">
      <div>
        <label>Bio</label>
        <textarea
          v-model="bio"
          placeholder="Bio"
          class="w-full p-2 border rounded"
        ></textarea>
      </div>

      <div>
        <label>Avatar Url</label>
        <input
          v-model="avatarUrl"
          type="url"
          placeholder="Avatar URL"
          class="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label>Banner Url</label>
        <input
          v-model="bannerUrl"
          type="url"
          placeholder="Banner URL"
          class="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full px-6 py-2 bg-gray-900 text-white rounded-full"
      >
        {{ loading ? "Saving..." : "Save Changes" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUiStore } from "../../store/ui";
import { useUserStore } from "../../store/userStore";
import { venueService } from "../../api/venueService";

const uiStore = useUiStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const venueId = route.params.id;

const name = ref("");
const description = ref("");
const location = ref("");
const price = ref(0);
const mediaUrl = ref("");

const loading = ref(false);
const fieldErrors = ref({
  name: null,
  description: null,
  location: null,
  price: null,
});

onMounted(async () => {
  loading.value = true;
  try {
    const venue = await venueService.getVenueById(venueId);

    if (venue.manager !== userStore.user.name) {
      uiStore.setMessage(
        "You do not have permission to edit this venue",
        "Error"
      );
      return router.push("/manager-only");
    }

    name.value = venue.name;
    description.value = venue.description;
    location.value = venue.location?.city || "";
    price.value = venue.price;
    mediaUrl.value = venue.media?.[0]?.url || "";
  } catch (err) {
    console.error(err);
    uiStore.setMessage("Failed to load venue data", "Error");
    router.push("/manager-only");
  } finally {
    loading.value = false;
  }
});

async function handleEditVenue() {
  loading.value = true;
  fieldErrors.value = {
    name: null,
    description: null,
    location: null,
    price: null,
  };

  try {
    if (!name.value) fieldErrors.value.name = "Name is required";
    if (!description.value)
      fieldErrors.value.description = "Description is required";
    if (!location.value) fieldErrors.value.location = "Location is required";
    if (price.value <= 0)
      fieldErrors.value.price = "Price must be greater than 0";

    if (Object.values(fieldErrors.value).some(Boolean)) {
      loading.value = false;
      return;
    }

    const payload = {
      name: name.value,
      description: description.value,
      location: { city: location.value },
      price: Number(price.value),
      media: [{ url: mediaUrl.value, alt: "Venue image" }],
    };

    await venueService.updateVenue(venueId, payload);

    uiStore.setMessage("Venue updated successfully", "Success");
    router.push("/manager-only");
  } catch (err) {
    console.error(err);
    uiStore.setMessage("Failed to update venue", "Error");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <h1 class="text-2xl font-bold mb-6">Edit Venue</h1>

    <form @submit.prevent="handleEditVenue" class="space-y-4">
      <div>
        <input
          v-model="name"
          type="text"
          placeholder="Venue Name"
          class="w-full p-2 border rounded"
        />
        <p v-if="fieldErrors.name" class="text-red-500 text-sm">
          {{ fieldErrors.name }}
        </p>
      </div>

      <div>
        <textarea
          v-model="description"
          placeholder="Description"
          class="w-full p-2 border rounded"
        ></textarea>
        <p v-if="fieldErrors.description" class="text-red-500 text-sm">
          {{ fieldErrors.description }}
        </p>
      </div>

      <div>
        <input
          v-model="location"
          type="text"
          placeholder="City"
          class="w-full p-2 border rounded"
        />
        <p v-if="fieldErrors.location" class="text-red-500 text-sm">
          {{ fieldErrors.location }}
        </p>
      </div>

      <div>
        <input
          v-model="price"
          type="number"
          placeholder="Price per night"
          class="w-full p-2 border rounded"
        />
        <p v-if="fieldErrors.price" class="text-red-500 text-sm">
          {{ fieldErrors.price }}
        </p>
      </div>

      <div>
        <input
          v-model="mediaUrl"
          type="url"
          placeholder="Image URL"
          class="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="px-6 py-2 bg-blue-500 text-white rounded"
      >
        {{ loading ? "Updating..." : "Update Venue" }}
      </button>
    </form>
  </div>
</template>

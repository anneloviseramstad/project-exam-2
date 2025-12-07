<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUiStore } from "../store/ui";
import { useUserStore } from "../store/userStore";
import { venueService } from "../api/venueService";

/**
 * Allows a venue manager edit an existing venue's details.
 * Loads the venue, validates input, and updates it via venueService.
 * Redirects unauthorized users.
 */

const uiStore = useUiStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const venueId = route.params.id;

const name = ref("");
const description = ref("");
const price = ref(0);
const maxGuests = ref(1);

const location = reactive({
  address: "",
  city: "",
  zip: "",
  country: "",
  continent: "",
  lat: 0,
  lng: 0,
});

const meta = reactive({
  wifi: false,
  parking: false,
  breakfast: false,
  pets: false,
});

const media = ref([{ url: "", alt: "" }]);

const loading = ref(false);
const fieldErrors = ref({
  name: null,
  description: null,
  location: null,
  price: null,
  maxGuests: null,
});

/**
 * Loads venue data on component mount.
 * Redirects user if not authorized to edit the venue.
 */
onMounted(async () => {
  loading.value = true;

  try {
    const venue = await venueService.getVenueById(venueId);

    if (venue.owner && venue.owner.name !== userStore.user?.name) {
      uiStore.setMessage(
        "You do not have permission to edit this venue",
        "Error"
      );
      return router.push("/manager-only");
    }

    name.value = venue.name;
    description.value = venue.description;
    price.value = venue.price;
    maxGuests.value = venue.maxGuests;

    if (venue.location) {
      Object.assign(location, venue.location);
    }

    if (venue.meta) {
      Object.assign(meta, venue.meta);
    }

    media.value = venue.media?.length
      ? venue.media.map((m) => ({ url: m.url, alt: m.alt || "" }))
      : [{ url: "", alt: "" }];
  } catch (e) {
    console.error(e);
    uiStore.setMessage("Failed to load venue", "Error");
    router.push("/manager-only");
  } finally {
    loading.value = false;
  }
});

/**
 * Adds a new empty media field.
 */
function addMediaField() {
  media.value.push({ url: "", alt: "" });
}

/**
 * Removes a media field at the given index.
 * @param {number} index - Index of the media field to remove.
 */
function removeMediaField(index) {
  media.value.splice(index, 1);
}

/**
 * Handles venue update request.
 * Validates input and updates the venue via venueService.
 */
async function handleEditVenue() {
  loading.value = true;
  fieldErrors.value = {
    name: null,
    description: null,
    location: null,
    price: null,
    maxGuests: null,
  };

  try {
    if (!name.value) fieldErrors.value.name = "Name is required";
    if (!description.value)
      fieldErrors.value.description = "Description is required";
    if (!location.city) fieldErrors.value.location = "City is required";
    if (price.value <= 0)
      fieldErrors.value.price = "Price must be greater than 0";
    if (maxGuests.value <= 0)
      fieldErrors.value.maxGuests = "Max guests must be greater than 0";
    if (Object.values(fieldErrors.value).some(Boolean)) {
      loading.value = false;
      return;
    }

    const payload = {
      name: name.value,
      description: description.value,
      price: Number(price.value),
      maxGuests: Number(maxGuests.value),
      location: { ...location },
      meta: { ...meta },
      media: media.value,
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
  <div class="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-6">
    <h1 class="text-2xl font-bold mb-4">Edit Venue</h1>
    <form @submit.prevent="handleEditVenue" class="space-y-4">
      <input
        v-model="name"
        type="text"
        placeholder="Venue Name"
        class="w-full p-2 border rounded"
      />
      <p v-if="fieldErrors.name" class="text-red-500 text-sm">
        {{ fieldErrors.name }}
      </p>
      <textarea
        v-model="description"
        placeholder="Description"
        class="w-full p-2 border rounded"
      ></textarea>
      <p v-if="fieldErrors.description" class="text-red-500 text-sm">
        {{ fieldErrors.description }}
      </p>
      <input
        v-model.number="price"
        type="number"
        placeholder="Price per night"
        class="w-full p-2 border rounded"
      />
      <p v-if="fieldErrors.price" class="text-red-500 text-sm">
        {{ fieldErrors.price }}
      </p>
      <input
        v-model.number="maxGuests"
        type="number"
        placeholder="Max Guests"
        class="w-full p-2 border rounded"
      />
      <p v-if="fieldErrors.maxGuests" class="text-red-500 text-sm">
        {{ fieldErrors.maxGuests }}
      </p>
      <h2 class="font-semibold mt-4">Location</h2>
      <input
        v-model="location.address"
        placeholder="Address"
        class="w-full p-2 border rounded"
      />
      <input
        v-model="location.city"
        placeholder="City"
        class="w-full p-2 border rounded"
      />
      <input
        v-model="location.zip"
        placeholder="ZIP"
        class="w-full p-2 border rounded"
      />
      <input
        v-model="location.country"
        placeholder="Country"
        class="w-full p-2 border rounded"
      />
      <input
        v-model="location.continent"
        placeholder="Continent"
        class="w-full p-2 border rounded"
      />
      <h2 class="font-semibold mt-4">Facilities</h2>
      <div class="flex flex-col">
        <label><input type="checkbox" v-model="meta.wifi" /> WiFi</label>
        <label><input type="checkbox" v-model="meta.parking" /> Parking</label>
        <label
          ><input type="checkbox" v-model="meta.breakfast" /> Breakfast</label
        >
        <label><input type="checkbox" v-model="meta.pets" /> Pets</label>
      </div>
      <h2 class="font-semibold mt-4">Media</h2>
      <div v-for="(m, index) in media" :key="index" class="space-y-2">
        <input
          v-model="m.url"
          type="url"
          placeholder="Image URL"
          class="w-full p-2 border rounded"
        />
        <input
          v-model="m.alt"
          type="text"
          placeholder="Alt text"
          class="w-full p-2 border rounded"
        />

        <button
          type="button"
          @click="removeMediaField(index)"
          class="text-red-500"
          v-if="media.length > 1"
        >
          Remove
        </button>
      </div>
      <button
        type="button"
        @click="addMediaField"
        class="text-white bg-gray-900 rounded-full px-4 md:px-6 py-2"
      >
        Add Image
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-4 md:px-6 py-2 border rounded-full text-black rounded mt-4 mx-2"
      >
        {{ loading ? "Updating..." : "Update Venue" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useUiStore } from "../store/ui";
import { useUserStore } from "../store/userStore";
import { venueService } from "../api/venueService";

const uiStore = useUiStore();
const userStore = useUserStore();
const router = useRouter();

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

function addMediaField() {
  media.value.push({ url: "", alt: "" });
}

function removeMediaField(index) {
  media.value.splice(index, 1);
}

async function handleCreateVenue() {
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
      manager: userStore.user.name,
    };

    await venueService.createVenue(payload);

    uiStore.setMessage("Venue created successfully", "Success");
    router.push("/manager-only");
  } catch (err) {
    console.error(err);
    uiStore.setMessage("Failed to create venue", "Error");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-6">
    <h1 class="text-2xl font-bold mb-4">Create Venue</h1>
    <form @submit.prevent="handleCreateVenue" class="space-y-4">
      <label>Venue Name</label>
      <input
        v-model="name"
        type="text"
        placeholder="Venue Name"
        class="w-full p-2 border rounded"
      />
      <p v-if="fieldErrors.name" class="text-red-500 text-sm">
        {{ fieldErrors.name }}
      </p>
      <label>Description</label>

      <textarea
        v-model="description"
        placeholder="Description"
        class="w-full p-2 border rounded"
      ></textarea>
      <p v-if="fieldErrors.description" class="text-red-500 text-sm">
        {{ fieldErrors.description }}
      </p>
      <label>Price / night</label>

      <input
        v-model.number="price"
        type="number"
        placeholder="Price per night"
        class="w-full p-2 border rounded"
      />
      <p v-if="fieldErrors.price" class="text-red-500 text-sm">
        {{ fieldErrors.price }}
      </p>
      <label>Max Guests</label>

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
      <label><input type="checkbox" v-model="meta.wifi" /> WiFi</label>
      <label><input type="checkbox" v-model="meta.parking" /> Parking</label>
      <label
        ><input type="checkbox" v-model="meta.breakfast" /> Breakfast</label
      >
      <label><input type="checkbox" v-model="meta.pets" /> Pets</label>
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
        {{ loading ? "Creating..." : "Create Venue" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { bookingService } from "../../api/bookingService";
import { venueService } from "../../api/venueService";
import { useUiStore } from "../../store/ui";
import { useUserStore } from "../../store/userStore";

const userStore = useUserStore();
const props = defineProps({
  venueId: String,
  price: Number,
  maxGuests: Number,
});

const uiStore = useUiStore();
const dateFrom = ref("");
const dateTo = ref("");
const guests = ref(1);
const loading = ref(false);
const bookedRanges = ref([]);

onMounted(async () => {
  const venue = await venueService.getVenueById(props.venueId, true);

  bookedRanges.value = venue.bookings
    ? venue.bookings.map((b) => ({
        start: new Date(b.dateFrom),
        end: new Date(b.dateTo),
      }))
    : [];
});

function isDateBooked(date) {
  return bookedRanges.value.some((range) => {
    const d = new Date(date);
    return d >= range.start && d <= range.end;
  });
}

const totalPrice = computed(() => {
  if (!dateFrom.value || !dateTo.value) return 0;
  const start = new Date(dateFrom.value);
  const end = new Date(dateTo.value);
  const days = (end - start) / (1000 * 60 * 60 * 24);
  return days > 0 ? days * props.price : 0;
});

async function submitBooking() {
  if (!userStore.isLoggedIn) {
    uiStore.setMessage("You must be logged in to book a venue.", "Error");
    return;
  }

  loading.value = true;

  try {
    await bookingService.createBooking({
      dateFrom: dateFrom.value,
      dateTo: dateTo.value,
      guests: Number(guests.value),
      venueId: props.venueId,
    });

    uiStore.setMessage("Your booking has been confirmed!");
    dateFrom.value = "";
    dateTo.value = "";
    guests.value = 1;
  } catch (error) {
    uiStore.setError("Booking failed");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="submitBooking">
    <div>
      <label class="font-semibold block mb-1">Check-in</label>
      <input
        type="date"
        v-model="dateFrom"
        :class="isDateBooked(dateFrom) ? 'bg-red-100' : ''"
        :min="new Date().toISOString().split('T')[0]"
        required
      />
      <p v-if="dateFrom && isDateBooked(dateFrom)" class="text-red-600 text-sm">
        This date is already booked
      </p>
    </div>
    <div>
      <label class="font-semibold block mb-1">Check-out</label>
      <input
        type="date"
        v-model="dateTo"
        :class="isDateBooked(dateTo) ? 'bg-red-100' : ''"
        :min="dateFrom || new Date().toISOString().split('T')[0]"
        required
      />
      <p v-if="dateTo && isDateBooked(dateTo)" class="text-red-600 text-sm">
        This date is already booked
      </p>
    </div>
    <div>
      <label class="font-semibold block mb-1">Guests</label>
      <input type="number" v-model="guests" :max="maxGuests" min="1" required />
    </div>
    <hr class="text-gray-300" />
    <div class="flex items-center justify-between">
      <div class="font-semibold text-lg">Total: ${{ totalPrice }}</div>
      <button
        class="rounded-full bg-gray-900 text-white px-4 py-2 font-medium"
        :disabled="
          loading ||
          !userStore.isLoggedIn ||
          isDateBooked(dateFrom) ||
          isDateBooked(dateTo)
        "
      >
        {{
          !userStore.isLoggedIn
            ? "Login required"
            : loading
            ? "Booking…"
            : "BOOK NOW"
        }}
      </button>
    </div>
  </form>
</template>

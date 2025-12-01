import api from "./api";

export const venueService = {
  async getAllVenues() {
    const response = await api.get("/holidaze/venues");
    return response.data.data;
  },

  async getVenueById(id, includeBookings = false) {
    const url = includeBookings
      ? `/holidaze/venues/${id}?_bookings=true`
      : `/holidaze/venues/${id}`;

    const response = await api.get(url);
    return response.data.data;
  },

  async search(query) {
    const response = await api.get(`/holidaze/venues?name_contains=${query}`);
    return response.data.data;
  },
};

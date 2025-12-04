import api from "./api";

export const venueService = {
  async getAllVenues(page = 1, limit = 12, includeBookings = false) {
    const bookingsParam = includeBookings ? "&_bookings=true" : "";
    const response = await api.get(
      `/holidaze/venues?sort=created&sortOrder=desc&limit=${limit}&page=${page}${bookingsParam}`
    );
    return response.data;
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
  async getVenuesByProfile(profileName) {
    const response = await api.get(`/holidaze/profiles/${profileName}/venues`);
    return response.data.data;
  },
  async createVenue(payload) {
    const response = await api.post("/holidaze/venues", payload);
    return response.data.data;
  },
  async updateVenue(id, payload) {
    const response = await api.put(`/holidaze/venues/${id}`, payload);
    return response.data.data;
  },
  async deleteVenue(id) {
    const response = await api.delete(`/holidaze/venues/${id}`);
    return response.data.data;
  },
};

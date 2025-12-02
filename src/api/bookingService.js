import api from "./api";

export const bookingService = {
  async createBooking(data) {
    const response = await api.post("/holidaze/bookings", data);
    return response.data.data;
  },
  async cancelBooking(bookingId) {
    const response = await api.delete(`/holidaze/bookings/${bookingId}`);
    return response.data;
  },
  async getBookingsByUser(userName) {
    const response = await api.get(
      `/holidaze/profiles/${userName}/bookings?_venue=true`
    );
    return response.data.data;
  },
  async getBookingsByVenue(venueId) {
    const response = await api.get(
      `/holidaze/venues/${venueId}?_bookings=true`
    );
    return response.data.data.bookings || [];
  },
};

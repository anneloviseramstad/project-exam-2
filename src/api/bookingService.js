import api from "./api";

/**
 * Service for creating, retrieving, and managing bookings.
 */

export const bookingService = {
  /**
   * Creates a new booking.
   * @param {Object} data - Booking details (date, venue ID, guests, etc.).
   * @returns {Promise<Object>} The created booking.
   */
  async createBooking(data) {
    const response = await api.post("/holidaze/bookings", data);
    return response.data.data;
  },

  /**
   * Cancels a booking by its ID.
   * @param {string} bookingId - The ID of the booking to delete.
   * @returns {Promise<Object>} API response after deletion.
   */
  async cancelBooking(bookingId) {
    const response = await api.delete(`/holidaze/bookings/${bookingId}`);
    return response.data;
  },

  /**
   * Gets all bookings made by a specific user.
   * @param {string} userName - The username whose bookings should be fetched.
   * @returns {Promise<Array>} List of bookings associated with the user.
   */
  async getBookingsByUser(userName) {
    const response = await api.get(
      `/holidaze/profiles/${userName}/bookings?_venue=true`
    );
    return response.data.data;
  },

  /**
   * Gets all bookings for a specific venue.
   * @param {string} venueId - The venue ID to fetch bookings for.
   * @returns {Promise<Array>} List of bookings for the venue.
   */
  async getBookingsByVenue(venueId) {
    const response = await api.get(
      `/holidaze/venues/${venueId}?_bookings=true`
    );
    return response.data.data.bookings || [];
  },
};

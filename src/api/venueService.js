import api from "./api";

/**
 * Service for fetching, creating, updating, and deleting venues.
 */

export const venueService = {
  /**
   * Retrieves a paginated list of venues.
   * @param {number} [page=1] - Current page number.
   * @param {number} [limit=12] - Number of venues per page.
   * @param {boolean} [includeBookings=false] - Whether to include booking data.
   * @returns {Promise<Object>} API response containing venues and pagination data.
   */
  async getAllVenues(page = 1, limit = 12, includeBookings = false) {
    const bookingsParam = includeBookings ? "&_bookings=true" : "";
    const response = await api.get(
      `/holidaze/venues?sort=created&sortOrder=desc&limit=${limit}&page=${page}${bookingsParam}`
    );
    return response.data;
  },

  /**
   * Retrieves a single venue by ID.
   * @param {string} id - Venue ID.
   * @param {boolean} [includeBookings=false] - Whether to include booking data.
   * @returns {Promise<Object>} The venue data.
   */
  async getVenueById(id, includeBookings = false) {
    const url = includeBookings
      ? `/holidaze/venues/${id}?_bookings=true`
      : `/holidaze/venues/${id}`;
    const response = await api.get(url);
    return response.data.data;
  },

  /**
   * Searches venues by name.
   * @param {string} query - Text used to match venue names.
   * @returns {Promise<Array>} List of venues that match the search.
   */
  async search(query) {
    const response = await api.get(`/holidaze/venues?name_contains=${query}`);
    return response.data.data;
  },

  /**
   * Retrieves all venues owned by a specific profile.
   * @param {string} profileName - Profile name to look up.
   * @returns {Promise<Array>} Venues that belongs to the profile.
   */
  async getVenuesByProfile(profileName) {
    const response = await api.get(`/holidaze/profiles/${profileName}/venues`);
    return response.data.data;
  },

  /**
   * Creates a new venue.
   * @param {Object} payload - Venue data (name, description, media, etc.).
   * @returns {Promise<Object>} The created venue.
   */
  async createVenue(payload) {
    const response = await api.post("/holidaze/venues", payload);
    return response.data.data;
  },

  /**
   * Updates an existing venue.
   * @param {string} id - Venue ID to update.
   * @param {Object} payload - Updated fields for the venue.
   * @returns {Promise<Object>} The updated venue.
   */
  async updateVenue(id, payload) {
    const response = await api.put(`/holidaze/venues/${id}`, payload);
    return response.data.data;
  },

  /**
   * Deletes a venue by ID.
   * @param {string} id - Venue ID to delete.
   * @returns {Promise<Object>} Confirmation or deleted venue data.
   */
  async deleteVenue(id) {
    const response = await api.delete(`/holidaze/venues/${id}`);
    return response.data.data;
  },

  /**
   * Retrieves a venue including its bookings and owner information.
   * @param {string} id - Venue ID.
   * @returns {Promise<Object>} Venue data with related bookings and owner.
   */
  async getVenueWithBookings(id) {
    const response = await api.get(
      `/holidaze/venues/${id}?_bookings=true&_owner=true`
    );
    return response.data.data;
  },
};

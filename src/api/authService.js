import api from "./api";

/**
 * Authentication and profile-related API methods.
 */

export const authService = {
  /**
   * Registers a new user with the provided data.
   * @param {Object} userData - User details for registration.
   * @returns {Promise<Object>} The created user data.
   */
  async register(userData) {
    const res = await api.post("/auth/register", userData);
    return res.data.data;
  },

  /**
   * Logs in a user using email and password.
   * @param {Object} credentials - Login credentials.
   * @param {string} credentials.email - User email.
   * @param {string} credentials.password - User password.
   * @returns {Promise<Object>} Authenticated user data and tokens.
   */
  async login(credentials) {
    const res = await api.post("/auth/login", credentials);
    return res.data.data;
  },

  /**
   * Retrieves a user's profile.
   * @param {string} name - The profile name to fetch.
   * @param {string} token - Authorization token.
   * @returns {Promise<Object>} Profile data.
   */
  async getProfile(name, token) {
    const res = await api.get(`/holidaze/profiles/${name}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  /**
   * Updates a user's profile with the given payload.
   * @param {string} name - The profile name to update.
   * @param {Object} payload - Fields to update.
   * @param {string} token - Authorization token.
   * @returns {Promise<Object>} Updated profile data.
   */
  async updateProfile(name, payload, token) {
    if (!payload || typeof payload !== "object") {
      throw new Error("Payload must be an object");
    }

    const res = await api.put(`/holidaze/profiles/${name}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.data;
  },
};

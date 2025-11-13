import api from "./api";

export const venueService = {
  getAllVenues() {
    return api.get("/holidaze/venues").then((res) => res.data.data);
  },
  getVenuesById(id) {
    return api.get(`/holidaze/venues/${id}`).then((res) => res.data.data);
  },
  search(query) {
    return api
      .get(`/holidaze/venues?name_contains=${query}`)
      .then((res) => res.data.data);
  },
};

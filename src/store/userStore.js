import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    role: null,
    userInfo: null,
  }),
  actions: {
    login(user) {
      this.isLoggedIn = true;
      this.role = user.role;
      this.userInfo = user;
    },
    logout() {
      this.isLoggedIn = false;
      this.role = null;
      this.userInfo = null;
    },
    updateAvatar(avatarUrl) {
      if (this.userInfo) {
        this.userInfo.avatar = avatarUrl;
      }
    },
  },
});

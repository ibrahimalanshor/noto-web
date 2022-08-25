import { defineStore } from 'pinia';

export default defineStore('auth', {
  state: () => ({
    isLogin: false,
    token: {
      accessToken: null,
      refreshToken: null,
    },
  }),
  getters: {
    decoded: (state) => jwt_decode(state.accessToken),
    expired: function (state) {
      return new Date() > new Date(this.decoded.expireAt * 1000);
    },
  },
  action: {
    login: function (accessToken, refreshToken) {
      this.token.accessToken = accessToken;
      this.token.refreshToken = refreshToken;

      this.isLogin = true;
    },
    refreshToken: function (accessToken) {
      this.token.accessToken = accessToken;
    },
    logout: function () {
      this.token.accessToken = null;
      this.token.refreshToken = null;
    },
  },
});
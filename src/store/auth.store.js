import { defineStore } from 'pinia';
import jwt_decode from 'jwt-decode';

export default defineStore('auth', {
  persist: true,
  state: () => ({
    isLogin: false,
    token: {
      accessToken: null,
      refreshToken: null,
    },
  }),
  getters: {
    decoded: (state) => jwt_decode(state.token.accessToken),
    expired: function (state) {
      return new Date('2022-08-26') > new Date(this.decoded.exp * 1000);
    },
  },
  actions: {
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

      this.isLogin = false;
    },
  },
});

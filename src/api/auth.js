import axios from 'axios';
import http from './http.js';

export default {
  baseURL: '/auth',
  login: async function (credential) {
    const res = await http().post(`${this.baseURL}/login`, credential);

    return res.data;
  },
  register: async function (credential) {
    const res = await http().post(`${this.baseURL}/register`, credential);

    return res.data;
  },
  refreshToken: async function (refreshToken) {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}${this.baseURL}/refresh-token`,
      { refreshToken }
    );

    return res.data;
  },
  logout: async function (refreshToken) {
    await http().post(`${this.baseURL}/logout`, { refreshToken });
  },
};

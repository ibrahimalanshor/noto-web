import http from './http.js';

export default {
  baseURL: 'profile',
  get: async function () {
    const res = await http().get(this.baseURL);

    return res.data;
  },
  update: async function (body) {
    const res = await http().patch(this.baseURL, body);

    return res.data;
  },
};

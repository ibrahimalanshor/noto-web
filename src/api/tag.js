import http from './http.js';

export default {
  baseURL: '/tags',
  get: async function () {
    const res = await http().get(this.baseURL);

    return res.data;
  },
};

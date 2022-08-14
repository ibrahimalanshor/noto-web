import { defineStore } from 'pinia';

export default defineStore('sidebar', {
  state: () => ({
    collapsed: true,
  }),
  actions: {
    show: function () {
      this.collapsed = false;
    },
    hide: function () {
      this.collapsed = true;
    },
  },
});

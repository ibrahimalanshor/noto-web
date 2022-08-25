import { defineStore } from 'pinia';

export default defineStore('toast', {
  state: () => ({
    visible: false,
    message: 'Something Error',
    type: 'danger',
  }),
  actions: {
    show: function (message, type = 'danger') {
      this.message = message;
      this.type = type;
      this.visible = true;
    },
    hide: function () {
      this.message = 'Something Error';
      this.type = 'danger';
      this.visible = false;
    },
  },
});

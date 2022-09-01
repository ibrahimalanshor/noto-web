import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import vClickOutside from 'click-outside-vue3';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './style.css';
import App from './App.vue';
import router from './router';
import { setupLocaleHelper as setupLocale } from './helpers';

const app = createApp(App);
const pinia = createPinia();
const i18n = createI18n({
  legacy: false,
  fallbackLocale: 'en',
});

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(vClickOutside);

setupLocale(i18n);

app.mount('#app');

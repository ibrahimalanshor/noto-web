import axios from 'axios';
import { useI18n } from 'vue-i18n';

export default async (to, from) => {
  const i18n = useI18n();
  const supportedLocales = ['en'];

  // set locale by browser locale
  let locale = 'en';

  if (!supportedLocales.includes(locale)) {
    locale = 'en';
  }

  if (!i18n.global.avaiableLocales.includes(locale)) {
    const messages = await import(`../../locales/${locale}.json`);

    i18n.global.setGlobalMessage(locale, messages.default);
  }

  i18n.global.locale.value = locale;

  axios.defaults.headers.common['Accept-Language'] = locale;
};

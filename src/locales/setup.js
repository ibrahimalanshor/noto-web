import axios from 'axios';

export default async (i18n) => {
  const supportedLocales = ['en'];

  // set locale by browser locale
  let locale = 'en';

  if (!supportedLocales.includes(locale)) {
    locale = 'en';
  }

  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await import(`./${locale}.json`);

    i18n.global.setLocaleMessage(locale, messages.default);
  }

  i18n.global.locale.value = locale;

  axios.defaults.headers.common['Accept-Language'] = locale;
};

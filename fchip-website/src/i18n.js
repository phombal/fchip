import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationsEn from './translations/en.json';
import translationsEs from './translations/es.json';
// Import translations for other languages

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationsEn
      },
      es: {
        translation: translationsEs
      },
      // Add resources for other languages
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false // React already escapes the string by default
    }
  });

export default i18n;

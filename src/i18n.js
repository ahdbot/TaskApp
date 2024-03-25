import i18n, { changeLanguage } from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import { initReactI18next } from "react-i18next";
import arabic from './languages/ar.json';
import english from './languages/en.json';
import french from './languages/fr.json';
import turkey from './languages/turk.json';
import japanese from './languages/jp.json';
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: english,
  },
  ar: {
    translation: arabic,
  },
  turk: {
    translation: turkey,
  },
  fr: {
    translation: turkey,
  },
  jp: {
    translation: japanese,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection: {
      order: ["localStorage", "htmlTag"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
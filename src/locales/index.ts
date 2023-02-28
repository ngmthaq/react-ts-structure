import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LANG_CONST from "const/lang.const";
import vi from "./resources/vi.json";
import en from "./resources/en.json";

i18n.use(initReactI18next).init({
  resources: { vi, en },
  fallbackLng: LANG_CONST.AVAILABLE_LANGUAGES.en.alias,
  defaultNS: LANG_CONST.AVAILABLE_NS.common,
  returnObjects: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

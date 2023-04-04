import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import { LOCALE_DEFAULT_LNG, LOCALE_DEFAULT_NS } from "const/locale.const";
import vi from "./vi";

export const resources = { vi };

i18next.use(initReactI18next).init({
  lng: LOCALE_DEFAULT_LNG.alias,
  resources: resources,
  defaultNS: LOCALE_DEFAULT_NS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;

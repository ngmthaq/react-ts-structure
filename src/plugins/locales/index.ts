import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import { DEFAULT_LNG, DEFAULT_NS } from "constants/locales";
import vi from "./vi";

export const resources = { vi };

i18next.use(initReactI18next).init({
  lng: DEFAULT_LNG.alias,
  resources: resources,
  defaultNS: DEFAULT_NS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;

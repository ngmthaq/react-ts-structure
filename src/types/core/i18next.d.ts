import { DEFAULT_LNG, DEFAULT_NS } from "constants/locales";
import { resources } from "plugins/locales/index";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NS;
    resources: (typeof resources)[DEFAULT_LNG.alias];
  }
}

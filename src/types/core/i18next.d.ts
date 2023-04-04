import { LOCALE_DEFAULT_LNG, LOCALE_DEFAULT_NS } from "const/locale.const";
import { resources } from "plugins/locales/index";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof LOCALE_DEFAULT_NS;
    resources: (typeof resources)[LOCALE_DEFAULT_LNG.alias];
  }
}

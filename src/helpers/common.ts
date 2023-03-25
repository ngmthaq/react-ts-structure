import { DEFAULT_NS } from "constants/locales";
import i18next from "plugins/locales";

export const trans = (key: string, ns: string = DEFAULT_NS): string => {
  return i18next.t(key, { ns: ns });
};

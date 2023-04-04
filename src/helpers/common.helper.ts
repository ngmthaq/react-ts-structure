import { LOCALE_DEFAULT_NS } from "const/locale.const";
import i18next from "plugins/locales";

export const trans = (key: string, ns: string = LOCALE_DEFAULT_NS): string => {
  return i18next.t(key, { ns: ns });
};

export const deepClone = (data: any): any => {
  if (typeof data !== "object") return data;
  return JSON.parse(JSON.stringify(data));
};

export const getParams = (key?: string): any => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  return key ? params.get(key) : Object.fromEntries(params.entries());
};

export const getRandomInRange = (from: any, to: any, fixed: any = 5) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
};

export const convertHex2Rgba = (hex: string, opacity: number = 1): string => {
  if (opacity > 1) opacity = 1;
  let c: any = null;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ", " + opacity + ")";
  }
  throw new Error("Cannot convert hex to rgb");
};

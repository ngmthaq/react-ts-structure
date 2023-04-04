import Cookies from "js-cookie";
import localforage from "localforage";

export const setCookies = (key: string, value: any, day: number = 0, options: Cookies.CookieAttributes = {}): void => {
  if (typeof value === "boolean") value = value === true ? 1 : 0;
  Cookies.set(key, JSON.stringify(value), { ...options, expires: day });
};

export const getCookies = (key: string): any => {
  const value = Cookies.get(key);
  return value ? JSON.parse(value) : null;
};

export const removeCookies = (key: string, options: Cookies.CookieAttributes = {}): void => {
  Cookies.remove(key, options);
};

export const setLocalForage = async (key: string, value: any, day: number = 0): Promise<void> => {
  if (typeof value === "boolean") value = value === true ? 1 : 0;
  localforage.setItem(key, JSON.stringify(value));
};

export const getLocalForage = async (key: string): Promise<any> => {
  const value: any = await localforage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeLocalForage = async (key: string): Promise<void> => {
  localforage.removeItem(key);
};

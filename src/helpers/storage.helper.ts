import Cookies from "js-cookie";
import localforage from "localforage";

export function setCookies<T>(key: string, value: T, day: number = 0, options: Cookies.CookieAttributes = {}): void {
  let data: any = value;
  if (typeof value === "boolean") data = value === true ? 1 : 0;
  Cookies.set(key, JSON.stringify(data), { ...options, expires: day });
}

export function getCookies<T>(key: string): T | null {
  let value = Cookies.get(key);
  return value ? JSON.parse(value) : null;
}

export function removeCookies(key: string, options: Cookies.CookieAttributes = {}): void {
  Cookies.remove(key, options);
}

export async function setLocalForage<T>(key: string, value: T): Promise<void> {
  let data: any = value;
  if (typeof value === "boolean") data = value === true ? 1 : 0;
  localforage.setItem(key, data);
}

export async function getLocalForage<T>(key: string): Promise<T | null> {
  let value: T | null | undefined = await localforage.getItem<T>(key);
  return value || null;
}

export async function removeLocalForage(key: string): Promise<void> {
  localforage.removeItem(key);
}

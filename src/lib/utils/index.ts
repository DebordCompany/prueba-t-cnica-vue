import { Book } from "../types";

export function setLocalStorage(name: string, data: Book[]) {
  window.localStorage.setItem(name, JSON.stringify(data));
}

export function getLocalStorage(name: string) {
  return window.localStorage.getItem(name);
}

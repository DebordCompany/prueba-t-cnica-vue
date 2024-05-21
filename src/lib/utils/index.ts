import { Book } from "../types";

export function setLocalStorage(name: string, data: Book[]) {
  window.localStorage.setItem(name, JSON.stringify(data));
}

export function getLocalStorage(name: string) {
  const data = window.localStorage.getItem(name);
  if (data) {
    return JSON.parse(data);
  } else {
    return name;
  }
}

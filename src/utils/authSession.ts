import { AUTH_STORAGE_KEYS } from "../constants/auth";

const UNAUTHORIZED_EVENT = "tdw:unauthorized";

export const getStoredToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(AUTH_STORAGE_KEYS.token)?.trim() || null;
};

export const getStoredUserJson = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(AUTH_STORAGE_KEYS.user);
};

export const saveStoredAuth = (token: string, user: unknown) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(AUTH_STORAGE_KEYS.token, token.trim());
  localStorage.setItem(AUTH_STORAGE_KEYS.user, JSON.stringify(user));
};

export const clearStoredAuth = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(AUTH_STORAGE_KEYS.token);
  localStorage.removeItem(AUTH_STORAGE_KEYS.user);
};

export const emitUnauthorized = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
};

export const subscribeToUnauthorized = (handler: () => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener(UNAUTHORIZED_EVENT, handler);

  return () => {
    window.removeEventListener(UNAUTHORIZED_EVENT, handler);
  };
};

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { AUTH_STORAGE_KEYS } from "../constants/auth";
import type { AuthUser } from "../interface";

export type User = AuthUser;

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const isValidUser = (value: unknown): value is User => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.email === "string" &&
    (candidate.role === "ADMIN" ||
      candidate.role === "LEADER" ||
      candidate.role === "DEVELOPER")
  );
};

const clearStoredAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEYS.token);
  localStorage.removeItem(AUTH_STORAGE_KEYS.user);
};

const readStoredAuth = (): { token: string; user: User } | null => {
  const storedToken = localStorage.getItem(AUTH_STORAGE_KEYS.token)?.trim();
  const storedUser = localStorage.getItem(AUTH_STORAGE_KEYS.user);

  if (!storedToken || !storedUser) {
    clearStoredAuth();
    return null;
  }

  try {
    const parsedUser = JSON.parse(storedUser) as unknown;

    if (!isValidUser(parsedUser)) {
      clearStoredAuth();
      return null;
    }

    return {
      token: storedToken,
      user: parsedUser,
    };
  } catch {
    clearStoredAuth();
    return null;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedAuth = readStoredAuth();

    if (storedAuth) {
      setToken(storedAuth.token);
      setUser(storedAuth.user);
    }
  }, []);

  const login = (nextToken: string, loggedUser: User) => {
    const trimmedToken = nextToken.trim();

    localStorage.setItem(AUTH_STORAGE_KEYS.token, trimmedToken);
    localStorage.setItem(AUTH_STORAGE_KEYS.user, JSON.stringify(loggedUser));

    setToken(trimmedToken);
    setUser(loggedUser);
  };

  const logout = () => {
    clearStoredAuth();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user && token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

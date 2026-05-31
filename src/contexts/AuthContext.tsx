import React, { createContext, useEffect, useState, ReactNode } from "react";
import type { AuthUser } from "../interface";
import { getCurrentUser } from "../services/api";
import {
  clearStoredAuth,
  getStoredToken,
  getStoredUserJson,
  saveStoredAuth,
  subscribeToUnauthorized,
} from "../utils/authSession";

export type User = AuthUser;

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingSession: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  syncUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const normalizeStoredUser = (value: unknown): User | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const role =
    typeof candidate.role === "string" ? candidate.role.toUpperCase() : candidate.role;

  if (
    (typeof candidate.id !== "string" && typeof candidate.id !== "number") ||
    typeof candidate.name !== "string" ||
    typeof candidate.email !== "string" ||
    (role !== "ADMIN" && role !== "LEADER" && role !== "DEVELOPER")
  ) {
    return null;
  }

  return {
    id: String(candidate.id),
    name: candidate.name.trim(),
    email: candidate.email.trim(),
    role,
    isActive: candidate.isActive !== false,
    createdAt:
      typeof candidate.createdAt === "string" ? candidate.createdAt : undefined,
    updatedAt:
      typeof candidate.updatedAt === "string" ? candidate.updatedAt : undefined,
  };
};

const readStoredUser = () => {
  const rawUser = getStoredUserJson();

  if (!rawUser) {
    return null;
  }

  try {
    return normalizeStoredUser(JSON.parse(rawUser) as unknown);
  } catch {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  const clearSession = () => {
    clearStoredAuth();
    setToken(null);
    setUser(null);
    setIsLoadingSession(false);
  };

  useEffect(() => {
    const unsubscribe = subscribeToUnauthorized(() => {
      clearSession();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const storedToken = getStoredToken();

    if (!storedToken) {
      clearSession();
      return;
    }

    const storedUser = readStoredUser();

    if (storedUser?.isActive) {
      setUser(storedUser);
    } else if (storedUser) {
      clearSession();
      return;
    }

    setToken(storedToken);

    let isMounted = true;

    const syncCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (!isMounted) {
          return;
        }

        if (!currentUser.isActive) {
          clearSession();
          return;
        }

        saveStoredAuth(storedToken, currentUser);
        setUser(currentUser);
      } catch {
        if (!isMounted) {
          return;
        }

        clearSession();
      } finally {
        if (isMounted) {
          setIsLoadingSession(false);
        }
      }
    };

    void syncCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = (nextToken: string, loggedUser: User) => {
    if (!loggedUser.isActive) {
      clearSession();
      return;
    }

    const trimmedToken = nextToken.trim();

    saveStoredAuth(trimmedToken, loggedUser);
    setToken(trimmedToken);
    setUser(loggedUser);
    setIsLoadingSession(false);
  };

  const logout = () => {
    clearSession();
  };

  const syncUser = (nextUser: User) => {
    if (!nextUser.isActive) {
      clearSession();
      return;
    }

    const storedToken = getStoredToken();

    if (!storedToken) {
      clearSession();
      return;
    }

    saveStoredAuth(storedToken, nextUser);
    setUser(nextUser);
    setIsLoadingSession(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(token && user),
        isLoadingSession,
        login,
        logout,
        syncUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "LEADER" | "DEVELOPER";
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem("@TDW:user");
    const storagedToken = localStorage.getItem("@TDW:token");

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
    }
  }, []);

  const login = (token: string, loggedUser: User) => {
    localStorage.setItem("@TDW:token", token);
    localStorage.setItem("@TDW:user", JSON.stringify(loggedUser));
    setUser(loggedUser);
  };

  const logout = () => {
    localStorage.removeItem("@TDW:token");
    localStorage.removeItem("@TDW:user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
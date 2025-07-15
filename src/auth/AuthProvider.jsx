import { createContext, useState, useEffect } from "react";
import React from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Keeps track of auth check

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    localStorage.setItem("role", userData.role);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (token && existingUser) {
      setUser(existingUser);
    } else {
      logout();
    }

    setLoading(false); // Done with auth check
  }, []);

  const role = user?.role;

  // ✅ Prevent rendering children until auth check is done
  if (loading) {
    return <div className="text-center text-white mt-10">Checking authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, role, isAuthenticated: user !== null }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in (e.g., from localStorage or cookies)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.removeItem("user"); // Clear old data
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Save login state
    router.refresh(); // Ensures state updates
    router.push("/user-dashboard"); // Redirect to protected page
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Clear login state
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear cookie
    router.push("/login"); // Redirect to login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
    // <>
    // {children}
    // </>
  );
};

export const useAuth = () => useContext(AuthContext);

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const AuthContext = createContext();
import { usePathname } from "next/navigation";
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {

    const rawCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userData="))
      ?.split("=")[1];

    if (rawCookie) {
      try {
        const decodedUser = decodeURIComponent(rawCookie);
        setUser(JSON.parse(decodedUser).userData);

      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
    else {
      setUser(null);
    }

  }, [path]);



  const logout = async () => {

    try {

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/logout`);
      if (response.data.status) {

        router.push(response.data.url)

      }

    } catch (error) {

      console.log(error, "error");

    }

    // document.cookie = "logintoken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Remove token
    // document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Remove user
    // setUser(null); // Clear context

    // window.location.href = "/login"; // Redirect to login page
  };
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>

  );
};

export const useAuth = () => useContext(AuthContext);


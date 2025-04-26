import React from "react";
import { useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { loginRequest } from "../requests/auth";
import AuthContext, { UserType } from "./AuthContext";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  // Initialize token from localStorage or null if not present
  const initialToken = localStorage.getItem("access_token");

  // Function to synchronously validate access_token (for now)
  const validateToken = (token: string) => {
    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const expirationTimeInSeconds = decodedToken.exp;
      const currentTime = Date.now() / 1000;
      return expirationTimeInSeconds > currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  // Synchronously set initial authentication state based on token validity
  const initialIsAuthenticated = initialToken
    ? validateToken(initialToken)
    : false;

  const [isAuthenticated, setIsAuthenticated] = useState(
    initialIsAuthenticated
  );
  const [access_token, setAccessToken] = useState<string | null>(initialToken);
  const [user, setUser] = useState<UserType | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");

    if (access_token && user) {
      const isTokenValid = validateToken(access_token);

      if (isTokenValid) {
        setAccessToken(access_token);
        setUser(JSON.parse(user));
        setIsAuthenticated(true);
      } else {
        // Token expirado, limpiar localStorage y estado
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        setAccessToken(null);
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await loginRequest(username, password);
      if (response.data.access) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setAccessToken(response.data.access);
        setUser(response.data.user);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
        if (error.response && error.response.status === 401) {
          // Unauthorized
          logout();
        }
      } else {
        console.error(error);
      }
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const isLoggedIn = !!access_token;
  return (
    <AuthContext.Provider
      value={{
        access_token,
        isLoggedIn,
        isAuthenticated,
        user,
        setToken: setAccessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

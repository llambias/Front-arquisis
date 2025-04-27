import React from "react";
import { useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { loginRequest, logoutRequest, registerRequest } from "../requests/auth";
import AuthContext, { UserType } from "./AuthContext";
import { validateTokenRequest } from "../requests/auth";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  // Initialize token from localStorage or null if not present
  const initialToken = localStorage.getItem("access_token");

  const validateToken = async () => {
    try {
      const response = await validateTokenRequest();
      return response.status.code === 200;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  const validateTokenByDate = (token: string) => {
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
    ? validateTokenByDate(initialToken)
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
    const validateUser = async () => {
      const access_token = localStorage.getItem("access_token");
      const user = localStorage.getItem("user");

      if (access_token && user) {
        const isTokenValid = await validateToken();
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
    };
    validateUser();
  }, [user?.funds]);

  const login = async (username: string, password: string) => {
    try {
      const { data, headers } = await loginRequest(username, password);
      const access_token = headers.authorization;
      const user = {
        id: data.data.id,
        email: data.data.email,
        first_name: data.data.first_name,
        last_name: data.data.last_name,
        funds: data.data.funds,
      };
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user", JSON.stringify(user));

        setAccessToken(access_token);
        setUser(user);
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

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      setAccessToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    password_confirmation: string,
    first_name: string,
    last_name: string,
  ) => {
    try {
      const { data } = await registerRequest(
        email,
        password,
        password_confirmation,
        first_name,
        last_name
      );
      if (data.status.code === 200) {
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return false;
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
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

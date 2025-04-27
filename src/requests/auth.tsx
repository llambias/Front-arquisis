import axios from "axios";
import axiosInstance from "./axios";

const API_URL = import.meta.env.VITE_API_URL;

export const registerRequest = async (
  email: string,
  password: string,
  password_confirmation: string,
  first_name: string,
  last_name: string
) => {
  const response = await axiosInstance.post("/api/v1/register", {
    user: {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      first_name: first_name,
      last_name: last_name,
    },
  });
  return {
    data: response.data,
    headers: response.headers,
  };
};

export const loginRequest = async (email: string, password: string) => {
  const response = await axiosInstance.post("/api/v1/login", {
    user: {
      email: email,
      password: password,
    },
  });
  return {
    data: response.data,
    headers: response.headers,
  };
};

export const logoutRequest = async () => {
  const response = await axiosInstance.delete("/api/v1/logout", {});
  return response.data;
};

export const validateTokenRequest = async (token: string) => {
  const response = await axios.post(
    `${API_URL}/api/v1/validate_token`,
    {}, // Empty body since we only need the token in headers
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

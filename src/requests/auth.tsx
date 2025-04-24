import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/";
const API_URL_AUTH = API_URL + "auth/v1/";

export const registerRequest = async (
  email: string,
  password: string,
  password_confirmation: string,
  first_name: string,
  last_name: string
) => {
  const response = await axios.post(API_URL_AUTH + "register", {
    user: {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      first_name: first_name,
      last_name: last_name,
      role: "user",
    },
  });
  return response.data;
};

export const loginRequest = async (email: string, password: string) => {
  const response = await axios.post(API_URL_AUTH + "login", {
    user: {
      email: email,
      password: password,
    },
  });
  return response.data;
};

export const logoutRequest = async () => {
  const response = await axios.post(API_URL_AUTH + "logout");
  return response.data;
};

export const validateTokenRequest = async () => {
  const response = await axios.post(API_URL_AUTH + "validate-token");
  return response.data;
};

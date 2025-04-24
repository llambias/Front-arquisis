import { createContext, useContext } from "react";

export type UserType = {
  email: string;
  first_name: string;
  last_name: string;
  balance: number; // monto de dinero disponible
  role: string;
};

type AuthContextType = {
  access_token: string | null;
  isLoggedIn: boolean;
  isAuthenticated: boolean;
  user: UserType | null;
  setToken: (access_token: string | null) => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;

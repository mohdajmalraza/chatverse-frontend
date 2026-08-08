import { createContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../api/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (userData) => {
    const data = await registerUser(userData);

    return data;
  };

  const login = async (userData) => {
    const data = await loginUser(userData);

    setUser(data.data?.user || data.user);

    return data;
  };

  const logout = async () => {
    await logoutUser();

    setUser(null);
  };

  const fetchCurrentUser = async () => {
    try {
      const data = await getCurrentUser();

      setUser(data.data?.user || data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

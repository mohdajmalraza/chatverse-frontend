import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/api/auth/register", userData);

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/api/auth/login", userData);

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/api/auth/profile");

  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/api/auth/logout");

  return response.data;
};

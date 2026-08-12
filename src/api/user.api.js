import axiosInstance from "./axiosInstance";

export const searchUsers = async (query) => {
  const response = await axiosInstance.get("/api/v1/users/search", {
    params: {
      q: query,
    },
  });

  return response.data.data;
};

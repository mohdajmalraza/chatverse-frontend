import axiosInstance from "./axiosInstance";

export const getConversations = async () => {
  const response = await axiosInstance.get("/api/v1/conversations");

  return response.data.data;
};

export const createConversation = async (receiverId) => {
  const response = await axiosInstance.post("/api/v1/conversations", {
    receiverId,
  });

  return response.data.data;
};

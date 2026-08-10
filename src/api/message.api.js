import axiosInstance from "./axiosInstance";

export const getMessageHistory = async (conversationId) => {
  const response = await axiosInstance.get(
    `/api/v1/messages/${conversationId}`,
  );

  return response.data.data;
};

export const sendMessage = async (conversationId, text) => {
  const response = await axiosInstance.post("/api/v1/messages", {
    conversationId,
    text,
  });

  return response.data.data;
};

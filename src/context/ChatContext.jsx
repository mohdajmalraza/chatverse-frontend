import { createContext, useCallback, useEffect, useState } from "react";

import {
  getConversations,
  createConversation as createConversationApi,
} from "../api/conversation.api";

import {
  getMessageHistory,
  sendMessage as sendMessageApi,
} from "../api/message.api";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState("");

  /*
   * Fetch all conversations
   */
  const fetchConversations = useCallback(async () => {
    try {
      setLoadingConversations(true);
      setError("");

      const data = await getConversations();

      setConversations(data);

      return data;
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message || "Failed to load conversations.";

      setError(message);

      return [];
    } finally {
      setLoadingConversations(false);
    }
  }, []);

  /*
   * Fetch conversations when ChatProvider mounts
   */
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  /*
   * Select conversation
   */
  const selectConversation = useCallback(async (conversation) => {
    setSelectedConversation(conversation);

    setMessages([]);

    if (!conversation?.conversationId) {
      return;
    }

    try {
      setLoadingMessages(true);
      setError("");

      const data = await getMessageHistory(conversation.conversationId);

      setMessages(data);
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Failed to load messages.");
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  /*
   * Send message
   */
  const sendMessage = useCallback(
    async (text) => {
      if (!selectedConversation?.conversationId || !text.trim()) {
        return;
      }

      try {
        setSendingMessage(true);
        setError("");

        const newMessage = await sendMessageApi(
          selectedConversation.conversationId,
          text.trim(),
        );

        setMessages((previousMessages) => [...previousMessages, newMessage]);

        /*
         * Update last message in conversation list
         */
        // setConversations((previousConversations) =>
        //   previousConversations.map((conversation) =>
        //     conversation.conversationId === selectedConversation.conversationId
        //       ? {
        //           ...conversation,
        //           lastMessage: newMessage,
        //           updatedAt: newMessage.createdAt,
        //         }
        //       : conversation,
        //   ),
        // );

        setConversations((previousConversations) => {
          const updatedConversation = previousConversations.find(
            (conversation) =>
              conversation.conversationId ===
              selectedConversation.conversationId,
          );

          if (!updatedConversation) {
            return previousConversations;
          }

          const updated = {
            ...updatedConversation,
            lastMessage: newMessage,
            updatedAt: newMessage.createdAt,
          };

          return [
            updated,
            ...previousConversations.filter(
              (conversation) =>
                conversation.conversationId !==
                selectedConversation.conversationId,
            ),
          ];
        });

        return newMessage;
      } catch (error) {
        console.error(error);

        setError(error.response?.data?.message || "Failed to send message.");

        throw error;
      } finally {
        setSendingMessage(false);
      }
    },
    [selectedConversation],
  );

  /*
   * Create or get conversation
   */
  // const createConversation = useCallback(
  //   async (receiverId) => {
  //     try {
  //       setError("");

  //       const conversation = await createConversationApi(receiverId);

  //       setConversations((previousConversations) => {
  //         const exists = previousConversations.some(
  //           (item) => item.conversationId === conversation.conversationId,
  //         );

  //         if (exists) {
  //           return previousConversations;
  //         }

  //         return [conversation, ...previousConversations];
  //       });

  //       await selectConversation(conversation);

  //       return conversation;
  //     } catch (error) {
  //       console.error(error);

  //       setError(
  //         error.response?.data?.message || "Failed to create conversation.",
  //       );

  //       throw error;
  //     }
  //   },
  //   [selectConversation],
  // );

  const createConversation = useCallback(async (receiverId) => {
    try {
      setError("");

      const conversation = await createConversationApi(receiverId);

      setConversations((previousConversations) => {
        const existingConversation = previousConversations.find(
          (item) => item.conversationId === conversation.conversationId,
        );

        if (existingConversation) {
          return previousConversations;
        }

        return [conversation, ...previousConversations];
      });

      return conversation;
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || "Failed to create conversation.",
      );

      throw error;
    }
  }, []);

  /*
   * Clear chat state
   */
  const clearChat = useCallback(() => {
    setConversations([]);
    setSelectedConversation(null);
    setMessages([]);
    setError("");
  }, []);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        selectedConversation,
        messages,

        loadingConversations,
        loadingMessages,
        sendingMessage,

        error,

        fetchConversations,
        selectConversation,
        sendMessage,
        createConversation,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

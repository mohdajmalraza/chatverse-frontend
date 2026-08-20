import { createContext, useEffect, useRef, useState } from "react";

import {
  getConversations,
  createConversation as createConversationApi,
} from "../api/conversation.api";
import { getMessageHistory } from "../api/message.api";
import { socket } from "../socket/socket";
import { useAuth } from "../hooks/useAuth";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  const [error, setError] = useState("");

  const selectedConversationRef = useRef(null);

  // Fetch conversations
  const fetchConversations = async () => {
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
  };

  // Select conversation
  const selectConversation = async (conversation) => {
    setSelectedConversation(conversation);

    selectedConversationRef.current = conversation;

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
  };

  // Send message
  const sendMessage = (text) => {
    if (!selectedConversation?.conversationId || !text.trim()) {
      return;
    }

    if (!socket.connected) {
      setError("Socket connection is not available.");
      return;
    }

    setSendingMessage(true);
    setError("");

    socket.emit("send_message", {
      conversationId: selectedConversation.conversationId,
      text: text.trim(),
    });
  };

  // Create or get conversation
  const createConversation = async (receiverId) => {
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
  };

  // Clear chat state
  const clearChat = () => {
    setConversations([]);
    setSelectedConversation(null);
    setMessages([]);
    setError("");
  };

  // Fetch conversations after authentication
  useEffect(() => {
    if (authLoading || !user) {
      return;
    }

    fetchConversations();
  }, [authLoading, user]);

  // Socket.IO
  useEffect(() => {
    if (authLoading || !user) {
      return;
    }

    const handleConnect = () => {
      console.log("Authenticated socket connected:", socket.id);
    };

    const handleConnectError = (error) => {
      console.error("Socket authentication failed:", error.message);

      setError(error.message || "Socket connection failed.");
    };

    const handleDisconnect = (reason) => {
      console.log("Socket disconnected:", reason);
    };

    const handleMessageSent = (message) => {
      const currentConversation = selectedConversationRef.current;

      // Add message to currently open conversation
      if (currentConversation?.conversationId === message.conversation) {
        setMessages((previousMessages) => [...previousMessages, message]);
      }

      // Update conversation list
      setConversations((previousConversations) => {
        const existingConversation = previousConversations.find(
          (conversation) =>
            conversation.conversationId === message.conversation,
        );

        if (!existingConversation) {
          return previousConversations;
        }

        const updatedConversation = {
          ...existingConversation,
          lastMessage: message,
          updatedAt: message.createdAt,
        };

        return [
          updatedConversation,
          ...previousConversations.filter(
            (conversation) =>
              conversation.conversationId !== message.conversation,
          ),
        ];
      });

      setSendingMessage(false);
    };

    const handleReceiveMessage = (message) => {
      const currentConversation = selectedConversationRef.current;

      // Add message to currently open conversation
      if (currentConversation?.conversationId === message.conversation) {
        setMessages((previousMessages) => [...previousMessages, message]);
      }

      // Update conversation list
      setConversations((previousConversations) => {
        const existingConversation = previousConversations.find(
          (conversation) =>
            conversation.conversationId === message.conversation,
        );

        if (!existingConversation) {
          return previousConversations;
        }

        const updatedConversation = {
          ...existingConversation,
          lastMessage: message,
          updatedAt: message.createdAt,
        };

        return [
          updatedConversation,
          ...previousConversations.filter(
            (conversation) =>
              conversation.conversationId !== message.conversation,
          ),
        ];
      });
    };

    const handleMessageError = (error) => {
      console.error("Socket message error:", error);

      setError(error.message || "Failed to send message.");

      setSendingMessage(false);
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.on("disconnect", handleDisconnect);

    socket.on("message_sent", handleMessageSent);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("message_error", handleMessageError);

    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("disconnect", handleDisconnect);

      socket.off("message_sent", handleMessageSent);
      socket.off("receive_message", handleReceiveMessage);
      socket.off("message_error", handleMessageError);

      socket.disconnect();
    };
  }, [authLoading, user]);

  // Clear chat state when user becomes unauthenticated
  useEffect(() => {
    if (!authLoading && !user) {
      clearChat();
    }
  }, [authLoading, user]);

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

// import { createContext, useCallback, useEffect, useRef, useState } from "react";

// import {
//   getConversations,
//   createConversation as createConversationApi,
// } from "../api/conversation.api";
// import { getMessageHistory } from "../api/message.api";
// import { socket } from "../socket/socket";
// import { useAuth } from "../hooks/useAuth";

// export const ChatContext = createContext();

// export const ChatProvider = ({ children }) => {
//   const { user, loading: authLoading } = useAuth();

//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [messages, setMessages] = useState([]);

//   const [loadingConversations, setLoadingConversations] = useState(false);
//   const [loadingMessages, setLoadingMessages] = useState(false);
//   const [sendingMessage, setSendingMessage] = useState(false);

//   const [error, setError] = useState("");

//   const selectedConversationRef = useRef(null);

//   // Fetch conversations
//   const fetchConversations = useCallback(async () => {
//     try {
//       setLoadingConversations(true);
//       setError("");

//       const data = await getConversations();

//       setConversations(data);

//       return data;
//     } catch (error) {
//       console.error(error);

//       const message =
//         error.response?.data?.message || "Failed to load conversations.";

//       setError(message);

//       return [];
//     } finally {
//       setLoadingConversations(false);
//     }
//   }, []);

//   // Select conversation
//   const selectConversation = useCallback(async (conversation) => {
//     setSelectedConversation(conversation);

//     selectedConversationRef.current = conversation;

//     setMessages([]);

//     if (!conversation?.conversationId) {
//       return;
//     }

//     try {
//       setLoadingMessages(true);
//       setError("");

//       const data = await getMessageHistory(conversation.conversationId);

//       setMessages(data);
//     } catch (error) {
//       console.error(error);

//       setError(error.response?.data?.message || "Failed to load messages.");
//     } finally {
//       setLoadingMessages(false);
//     }
//   }, []);

//   // Send message
//   const sendMessage = useCallback(
//     (text) => {
//       if (!selectedConversation?.conversationId || !text.trim()) {
//         return;
//       }

//       if (!socket.connected) {
//         setError("Socket connection is not available.");
//         return;
//       }

//       setSendingMessage(true);
//       setError("");

//       socket.emit("send_message", {
//         conversationId: selectedConversation.conversationId,
//         text: text.trim(),
//       });
//     },
//     [selectedConversation],
//   );

//   // Create or get conversation
//   const createConversation = useCallback(async (receiverId) => {
//     try {
//       setError("");

//       const conversation = await createConversationApi(receiverId);

//       setConversations((previousConversations) => {
//         const existingConversation = previousConversations.find(
//           (item) => item.conversationId === conversation.conversationId,
//         );

//         if (existingConversation) {
//           return previousConversations;
//         }

//         return [conversation, ...previousConversations];
//       });

//       return conversation;
//     } catch (error) {
//       console.error(error);

//       setError(
//         error.response?.data?.message || "Failed to create conversation.",
//       );

//       throw error;
//     }
//   }, []);

//   // Clear chat state
//   const clearChat = useCallback(() => {
//     setConversations([]);
//     setSelectedConversation(null);
//     selectedConversationRef.current = null;
//     setMessages([]);
//     setError("");
//   }, []);

//   useEffect(() => {
//     if (authLoading || !user) {
//       return;
//     }

//     fetchConversations();
//   }, [authLoading, user, fetchConversations]);

//   useEffect(() => {
//     if (authLoading || !user) {
//       return;
//     }

//     const handleConnect = () => {
//       console.log("Authenticated socket connected:", socket.id);
//     };

//     const handleConnectError = (error) => {
//       console.error("Socket authentication failed:", error.message);

//       setError(error.message || "Socket connection failed.");
//     };

//     const handleDisconnect = (reason) => {
//       console.log("Socket disconnected:", reason);
//     };

//     const handleMessageSent = (message) => {
//       const currentConversation = selectedConversationRef.current;

//       // Add message to currently open conversation
//       if (currentConversation?.conversationId === message.conversation) {
//         setMessages((previousMessages) => [...previousMessages, message]);
//       }

//       // Update conversation list
//       setConversations((previousConversations) => {
//         const existingConversation = previousConversations.find(
//           (conversation) =>
//             conversation.conversationId === message.conversation,
//         );

//         if (!existingConversation) {
//           return previousConversations;
//         }

//         const updatedConversation = {
//           ...existingConversation,
//           lastMessage: message,
//           updatedAt: message.createdAt,
//         };

//         return [
//           updatedConversation,
//           ...previousConversations.filter(
//             (conversation) =>
//               conversation.conversationId !== message.conversation,
//           ),
//         ];
//       });

//       setSendingMessage(false);
//     };

//     const handleReceiveMessage = (message) => {
//       const currentConversation = selectedConversationRef.current;

//       // Add message to currently open conversation
//       if (currentConversation?.conversationId === message.conversation) {
//         setMessages((previousMessages) => [...previousMessages, message]);
//       }

//       // Update conversation list
//       setConversations((previousConversations) => {
//         const existingConversation = previousConversations.find(
//           (conversation) =>
//             conversation.conversationId === message.conversation,
//         );

//         if (!existingConversation) {
//           return previousConversations;
//         }

//         const updatedConversation = {
//           ...existingConversation,
//           lastMessage: message,
//           updatedAt: message.createdAt,
//         };

//         return [
//           updatedConversation,
//           ...previousConversations.filter(
//             (conversation) =>
//               conversation.conversationId !== message.conversation,
//           ),
//         ];
//       });
//     };

//     const handleMessageError = (error) => {
//       console.error("Socket message error:", error);

//       setError(error.message || "Failed to send message.");
//       setSendingMessage(false);
//     };

//     socket.on("connect", handleConnect);
//     socket.on("connect_error", handleConnectError);
//     socket.on("disconnect", handleDisconnect);

//     socket.on("message_sent", handleMessageSent);
//     socket.on("receive_message", handleReceiveMessage);
//     socket.on("message_error", handleMessageError);

//     socket.connect();

//     return () => {
//       socket.off("connect", handleConnect);
//       socket.off("connect_error", handleConnectError);
//       socket.off("disconnect", handleDisconnect);

//       socket.off("message_sent", handleMessageSent);
//       socket.off("receive_message", handleReceiveMessage);
//       socket.off("message_error", handleMessageError);

//       socket.disconnect();
//     };
//   }, [authLoading, user]);

//   // Clear chat state when user becomes unauthenticated
//   useEffect(() => {
//     if (!authLoading && !user) {
//       clearChat();
//     }
//   }, [authLoading, user, clearChat]);

//   return (
//     <ChatContext.Provider
//       value={{
//         conversations,
//         selectedConversation,
//         messages,

//         loadingConversations,
//         loadingMessages,
//         sendingMessage,

//         error,

//         fetchConversations,
//         selectConversation,
//         sendMessage,
//         createConversation,
//         clearChat,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

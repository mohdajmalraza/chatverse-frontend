import { useEffect, useRef, useState } from "react";
import { FiPaperclip, FiSend } from "react-icons/fi";

import { socket } from "../../socket/socket.js";

function MessageInput({ conversationId, onSendMessage, sending }) {
  const [message, setMessage] = useState("");

  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);

  const handleTyping = (value) => {
    setMessage(value);

    if (!conversationId || !socket.connected) {
      return;
    }

    // Empty input → immediately stop typing
    if (!value.trim()) {
      if (isTypingRef.current) {
        socket.emit("typing:stop", {
          conversationId,
        });

        isTypingRef.current = false;
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      return;
    }

    // User started typing
    if (!isTypingRef.current) {
      socket.emit("typing:start", {
        conversationId,
      });

      isTypingRef.current = true;
    }

    // Reset debounce timer
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing:stop", {
        conversationId,
      });

      isTypingRef.current = false;
    }, 1000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || sending) {
      return;
    }

    // Stop typing immediately when sending
    if (isTypingRef.current) {
      socket.emit("typing:stop", {
        conversationId,
      });

      isTypingRef.current = false;
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    try {
      await onSendMessage(trimmedMessage);

      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      if (isTypingRef.current && socket.connected) {
        socket.emit("typing:stop", {
          conversationId,
        });
      }
    };
  }, [conversationId]);

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-4xl items-center gap-2"
      >
        {/* Attachment */}
        <button
          type="button"
          className="flex-shrink-0 rounded-full p-2.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <FiPaperclip className="h-5 w-5" />
        </button>

        {/* Input */}
        <input
          type="text"
          value={message}
          onChange={(event) => handleTyping(event.target.value)}
          placeholder="Type a message..."
          disabled={sending}
          className="flex-1 rounded-full bg-gray-100 px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500"
        />

        {/* Send */}
        <button
          type="submit"
          disabled={!message.trim() || sending}
          className="flex-shrink-0 rounded-full bg-blue-600 p-2.5 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <FiSend className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;

import { useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import MessageBubble from "./MessageBubble";

function MessageList({ messages, loading, error, isTyping }) {
  const { user } = useAuth();

  const bottomRef = useRef(null);

  // Scroll to the latest message / typing indicator
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  return (
    <div
      className="flex-1 overflow-y-auto px-5 py-6"
      style={{
        backgroundImage: "url('/chat_background.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "500px auto",
      }}
    >
      <div className="mx-auto flex min-h-full max-w-4xl flex-col gap-3">
        {loading && (
          <p className="text-center text-sm text-gray-400">
            Loading messages...
          </p>
        )}

        {!loading && error && (
          <p className="text-center text-sm text-red-500">{error}</p>
        )}

        {!loading && !error && messages.length === 0 && (
          <p className="text-center text-sm text-gray-400">
            No messages yet. Start the conversation.
          </p>
        )}

        {!loading &&
          !error &&
          messages.map((message) => (
            <MessageBubble
              key={message._id}
              message={message}
              isMine={message.sender?._id === user?.id}
            />
          ))}

        {/* Typing indicator */}
        <div className="mt-auto">
          {isTyping && (
            <div className="flex items-center">
              <div className="inline-flex items-center rounded-2xl rounded-bl-sm bg-gray-200 px-3 py-3">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500" />
                </span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}

export default MessageList;

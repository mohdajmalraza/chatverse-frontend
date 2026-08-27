import { useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import MessageBubble from "./MessageBubble";

function MessageList({ messages, loading, error }) {
  const { user } = useAuth();

  const bottomRef = useRef(null);

  // Scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 px-5 py-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-3">
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

        {/* Invisible element at the bottom */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default MessageList;

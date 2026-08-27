import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChat } from "../../hooks/useChat";

function ChatWindow({ onlineUsers, onBack }) {
  const {
    selectedConversation,
    messages,
    loadingMessages,
    sendingMessage,
    error,
    sendMessage,
  } = useChat();

  if (!selectedConversation) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50 px-4">
        <div className="flex w-full max-w-sm flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl sm:h-24 sm:w-24">
            <img
              src="/chat_verse.png"
              alt="ChatVerse"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Heading */}
          <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl">
            Welcome to Chat<span className="text-indigo-500">Verse</span>
          </h2>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-gray-400 sm:text-base">
            Select a conversation to start chatting.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <ChatHeader
        receiver={selectedConversation.receiver}
        isOnline={onlineUsers.has(
          selectedConversation.receiver?._id?.toString(),
        )}
        onBack={onBack}
      />

      <MessageList
        messages={messages}
        loading={loadingMessages}
        error={error}
      />

      <MessageInput onSendMessage={sendMessage} sending={sendingMessage} />
    </div>
  );
}

export default ChatWindow;

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
      <div className="flex h-full items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-700">
            Welcome to ChatVerse
          </h2>

          <p className="mt-1 text-sm text-gray-400">
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

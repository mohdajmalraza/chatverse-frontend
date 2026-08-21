import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../hooks/useChat";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";

function ChatPage() {
  const {
    conversations,
    selectedConversation,
    selectConversation,
    loadingConversations,
    error,
  } = useChat();

  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();

  const handleSelectConversation = (conversation) => {
    // navigate(`/chat?conversation=${conversation.conversationId}`);
    navigate(`/chat`);

    selectConversation(conversation);
    setShowChat(true);
  };

  const handleBackToSidebar = () => {
    setShowChat(false);
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="mx-auto flex h-full max-w-7xl overflow-hidden bg-white shadow-sm">
        {/* Chat Sidebar */}
        <div
          className={`w-full border-r border-gray-200 md:block md:w-80 lg:w-96 ${showChat ? "hidden" : "block"}`}
        >
          <ChatSidebar
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            loading={loadingConversations}
            error={error}
          />
        </div>

        {/* Chat Window */}
        <div
          className={`w-full flex-1 ${showChat ? "block" : "hidden"} md:block`}
        >
          <ChatWindow onBack={handleBackToSidebar} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;

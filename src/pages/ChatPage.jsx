import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import { socket } from "../socket/socket";

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
    navigate(`/chat?conversation=${conversation.conversationId}`);

    selectConversation(conversation);
    setShowChat(true);
  };

  const handleBackToSidebar = () => {
    setShowChat(false);
  };

  useEffect(() => {
    socket.connect(); // Manually establishes the Socket.IO connection

    socket.on("connect", () => {
      console.log("Authenticated socket connected:", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket authentication failed:", error.message);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, []);

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

// import { useContext } from "react";

// import { ChatContext } from "../context/ChatContext";

// import ChatSidebar from "../components/chat/ChatSidebar";
// import ChatWindow from "../components/chat/ChatWindow";

// function ChatPage() {
//   const {
//     conversations,
//     selectedConversation,
//     selectConversation,
//     loadingConversations,
//     error,
//   } = useContext(ChatContext);

//   return (
//     <div className="h-screen bg-gray-100">
//       <div className="mx-auto flex h-full max-w-7xl overflow-hidden bg-white shadow-sm">
//         {/* Sidebar */}
//         <div className="w-full border-r border-gray-200 md:w-80 lg:w-96">
//           <ChatSidebar
//             conversations={conversations}
//             selectedConversation={selectedConversation}
//             onSelectConversation={selectConversation}
//             loading={loadingConversations}
//             error={error}
//           />
//         </div>

//         {/* Chat */}
//         <div className="hidden flex-1 md:block">
//           <ChatWindow />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;

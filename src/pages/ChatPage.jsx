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

  return (
    <div className="h-screen bg-gray-100">
      <div className="mx-auto flex h-full max-w-7xl overflow-hidden bg-white shadow-sm">
        {/* Sidebar */}
        <div className="w-full border-r border-gray-200 md:w-80 lg:w-96">
          <ChatSidebar
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={selectConversation}
            loading={loadingConversations}
            error={error}
          />
        </div>

        {/* Chat Window */}
        <div className="hidden flex-1 md:block">
          <ChatWindow />
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

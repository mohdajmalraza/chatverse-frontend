import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChat } from "../../hooks/useChat";

function ChatWindow() {
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
      <ChatHeader receiver={selectedConversation.receiver} />

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

// import { useContext } from "react";
// import { ChatContext } from "../../context/ChatContext";
// import ChatHeader from "./ChatHeader";
// import MessageList from "./MessageList";
// import MessageInput from "./MessageInput";

// function ChatWindow() {
//   const {
//     selectedConversation,
//     messages,
//     loadingMessages,
//     sendingMessage,
//     error,
//     sendMessage,
//   } = useContext(ChatContext);

//   if (!selectedConversation) {
//     return (
//       <div className="flex h-full items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <h2 className="text-lg font-semibold text-gray-700">
//             Welcome to ChatVerse
//           </h2>

//           <p className="mt-1 text-sm text-gray-400">
//             Select a conversation to start chatting.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-full flex-col">
//       <ChatHeader receiver={selectedConversation.receiver} />

//       <MessageList
//         messages={messages}
//         loading={loadingMessages}
//         error={error}
//       />

//       <MessageInput onSendMessage={sendMessage} sending={sendingMessage} />
//     </div>
//   );
// }

// export default ChatWindow;

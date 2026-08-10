import { FiMoreVertical, FiSearch } from "react-icons/fi";
import ConversationItem from "./ConversationItem";

function ChatSidebar({
  conversations,
  selectedConversation,
  onSelectConversation,
  loading,
  error,
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">ChatVerse</h1>

          <button
            type="button"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <FiMoreVertical className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full rounded-lg bg-gray-100 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="p-6 text-center text-sm text-gray-500">
            Loading conversations...
          </div>
        )}

        {!loading && error && (
          <div className="p-6 text-center text-sm text-red-500">{error}</div>
        )}

        {!loading && !error && conversations.length === 0 && (
          <div className="p-6 text-center text-sm text-gray-500">
            No conversations yet.
          </div>
        )}

        {!loading &&
          !error &&
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.conversationId}
              conversation={conversation}
              selected={
                selectedConversation?.conversationId ===
                conversation.conversationId
              }
              onClick={() => onSelectConversation(conversation)}
            />
          ))}
      </div>
    </div>
  );
}

export default ChatSidebar;

// import ConversationItem from "./ConversationItem";

// function ChatSidebar({
//   conversations,
//   selectedConversation,
//   onSelectConversation,
//   loading,
//   error,
// }) {
//   return (
//     <div className="flex h-full flex-col">
//       {/* Header */}
//       <div className="border-b border-gray-200 p-4">
//         <div className="mb-4 flex items-center justify-between">
//           <h1 className="text-xl font-bold text-gray-900">ChatVerse</h1>

//           <button
//             type="button"
//             className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
//           >
//             ⋮
//           </button>
//         </div>

//         {/* Search */}
//         <div className="relative">
//           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//             🔍
//           </span>

//           <input
//             type="text"
//             placeholder="Search conversations..."
//             className="w-full rounded-lg bg-gray-100 py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       {/* Conversation list */}
//       <div className="flex-1 overflow-y-auto">
//         {loading && (
//           <div className="p-6 text-center text-sm text-gray-500">
//             Loading conversations...
//           </div>
//         )}

//         {!loading && error && (
//           <div className="p-6 text-center text-sm text-red-500">{error}</div>
//         )}

//         {!loading && !error && conversations.length === 0 && (
//           <div className="p-6 text-center text-sm text-gray-500">
//             No conversations yet.
//           </div>
//         )}

//         {!loading &&
//           !error &&
//           conversations.map((conversation) => (
//             <ConversationItem
//               key={conversation.conversationId}
//               conversation={conversation}
//               selected={
//                 selectedConversation?.conversationId ===
//                 conversation.conversationId
//               }
//               onClick={() => onSelectConversation(conversation)}
//             />
//           ))}
//       </div>
//     </div>
//   );
// }

// export default ChatSidebar;

import { useState } from "react";
import ConversationItem from "./ConversationItem";
import NewConversation from "./NewConversation";
import { FiSearch } from "react-icons/fi";
import { LuMessageSquareDiff } from "react-icons/lu";

function ChatSidebar({
  conversations,
  selectedConversation,
  onSelectConversation,
  loading,
  error,
}) {
  const [showNewConversation, setShowNewConversation] = useState(false);

  if (showNewConversation) {
    return (
      <NewConversation
        onBack={() => setShowNewConversation(false)}
        onSelectConversation={onSelectConversation}
      />
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 mb-1">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Chat<span className="text-indigo-500">Verse</span>
          </h1>

          <button
            type="button"
            onClick={() => setShowNewConversation(true)}
            className="rounded-full p-3 text-gray-500 transition cursor-pointer hover:bg-indigo-50"
            title="New chat"
          >
            <LuMessageSquareDiff className="h-6 w-6 text-indigo-500" />
          </button>

          {/* <button
            type="button"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <FiMoreVertical className="h-5 w-5" />
          </button> */}
        </div>

        {/* Search existing conversations */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search chats..."
            className="w-full rounded-lg bg-gray-100 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex flex-1 flex-col px-4 gap-1 overflow-y-auto">
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

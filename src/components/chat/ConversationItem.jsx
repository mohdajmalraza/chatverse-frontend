function ConversationItem({ conversation, selected, isOnline, onClick }) {
  const receiver = conversation.receiver;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-3 text-left rounded-xl transition ${
        selected ? "bg-blue-50" : "hover:bg-gray-50"
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src={receiver?.avatar || "https://i.pravatar.cc/150?img=12"}
          alt={receiver?.name || "User"}
          className="h-12 w-12 rounded-full object-cover"
        />

        {isOnline && (
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h2 className="truncate text-sm font-semibold text-gray-900">
            {receiver?.name}
          </h2>

          <span className="flex-shrink-0 text-xs text-gray-400">
            {conversation.updatedAt
              ? new Date(conversation.updatedAt).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
              : ""}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-sm text-gray-500">
            {conversation.lastMessage?.text || "No messages yet"}
          </p>

          {/* {conversation.unreadCount > 0 && (
            <span className="flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-medium text-white">
              {conversation.unreadCount}
            </span>
          )} */}
        </div>
      </div>
    </button>
  );
}

export default ConversationItem;

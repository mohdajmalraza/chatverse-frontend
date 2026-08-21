import { useEffect, useState } from "react";
import { FiArrowLeft, FiSearch } from "react-icons/fi";

import { useChat } from "../../hooks/useChat";
import { searchUsers } from "../../api/user.api";

function NewConversation({ onBack, onSelectConversation }) {
  const { createConversation } = useChat();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [creatingConversation, setCreatingConversation] = useState(false);

  const [error, setError] = useState("");

  // Search users
  useEffect(() => {
    const query = search.trim();

    if (query.length < 2) {
      setUsers([]);
      setError("");
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const data = await searchUsers(query);

        setUsers(data);
      } catch (error) {
        console.error(error);

        setUsers([]);

        setError(error.response?.data?.message || "Failed to search users.");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Start conversation
  const handleUserClick = async (user) => {
    try {
      setCreatingConversation(true);
      setError("");

      const conversation = await createConversation(user._id);

      // Tell ChatPage to open ChatWindow.
      onSelectConversation(conversation);
      onBack();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || "Failed to start conversation.",
      );
    } finally {
      setCreatingConversation(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-2 py-3">
        <button
          type="button"
          onClick={onBack}
          disabled={creatingConversation}
          className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
          aria-label="Back"
        >
          <FiArrowLeft className="h-5 w-5" />
        </button>

        <h2 className="text-lg font-semibold text-gray-900">New chat</h2>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name or email..."
            autoFocus
            className="w-full rounded-lg bg-gray-100 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {search.trim().length < 2 && (
          <p className="px-4 text-sm text-gray-400">
            Type at least 2 characters to search.
          </p>
        )}

        {loading && (
          <p className="px-4 text-sm text-gray-500">Searching users...</p>
        )}

        {!loading && error && (
          <p className="px-4 text-sm text-red-500">{error}</p>
        )}

        {!loading &&
          !error &&
          search.trim().length >= 2 &&
          users.length === 0 && (
            <p className="px-4 text-sm text-gray-400">No users found.</p>
          )}

        {!loading &&
          !error &&
          users.map((user) => (
            <button
              key={user._id}
              type="button"
              disabled={creatingConversation}
              onClick={() => handleUserClick(user)}
              className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <img
                src={user.avatar || "https://i.pravatar.cc/150?img=12"}
                alt={user.name}
                className="h-11 w-11 rounded-full object-cover"
              />

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-gray-900">
                  {user.name}
                </h3>

                <p className="truncate text-sm text-gray-500">{user.email}</p>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}

export default NewConversation;

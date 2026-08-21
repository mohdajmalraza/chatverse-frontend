import { useState } from "react";
import { FiPaperclip, FiSend } from "react-icons/fi";

function MessageInput({ onSendMessage, sending }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage || sending) {
      return;
    }

    try {
      await onSendMessage(trimmedMessage);

      setMessage("");
    } catch (error) {
      // Error is already handled by ChatContext.
      console.error(error);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-4xl items-center gap-2"
      >
        {/* Attachment */}
        <button
          type="button"
          className="flex-shrink-0 rounded-full p-2.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <FiPaperclip className="h-5 w-5" />
        </button>

        {/* Input */}
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type a message..."
          disabled={sending}
          className="flex-1 rounded-full bg-gray-100 px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500"
        />

        {/* Send */}
        <button
          type="submit"
          disabled={!message.trim() || sending}
          className="flex-shrink-0 rounded-full bg-blue-600 p-2.5 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <FiSend className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;

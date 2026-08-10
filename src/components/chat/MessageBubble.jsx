import { FiCheck } from "react-icons/fi";

function MessageBubble({ message, isMine }) {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
          isMine
            ? "rounded-br-md bg-blue-600 text-white"
            : "rounded-bl-md bg-white text-gray-900 shadow-sm"
        }`}
      >
        <p className="break-words text-sm leading-5">{message.text}</p>

        <div
          className={`mt-1 flex items-center justify-end gap-1 text-[11px] ${
            isMine ? "text-blue-100" : "text-gray-400"
          }`}
        >
          {message.createdAt &&
            new Date(message.createdAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}

          {isMine && <FiCheck className="h-3.5 w-3.5" />}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;

// function MessageBubble({ message, isMine }) {
//   return (
//     <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
//       <div
//         className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
//           isMine
//             ? "rounded-br-md bg-blue-600 text-white"
//             : "rounded-bl-md bg-white text-gray-900 shadow-sm"
//         }`}
//       >
//         <p className="break-words text-sm leading-5">{message.text}</p>

//         <div
//           className={`mt-1 text-right text-[11px] ${
//             isMine ? "text-blue-100" : "text-gray-400"
//           }`}
//         >
//           {message.createdAt &&
//             new Date(message.createdAt).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MessageBubble;

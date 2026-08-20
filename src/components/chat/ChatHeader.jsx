import { FiArrowLeft, FiMoreVertical } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";

function ChatHeader({ receiver, onBack }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3">
      <div className="flex items-center gap-2">
        {/* Back button - mobile only */}
        <button
          type="button"
          onClick={onBack}
          className="rounded-full py-2 text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label="Back to conversations"
        >
          <FiArrowLeft className="h-5 w-5" />
        </button>

        {/* Avatar */}
        <div className="relative">
          <img
            src={receiver?.avatar || "https://i.pravatar.cc/150?img=12"}
            alt={receiver?.name || "User"}
            className="h-11 w-11 rounded-full object-cover"
          />

          {/* Socket.IO will replace this */}
          {/* <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" /> */}
        </div>

        {/* User info */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            {receiver?.name}
          </h2>

          {/* Socket.IO will replace this */}
          <p className="text-xs text-gray-400">Offline</p>
          {/* <p className="text-xs text-green-500">{receiver?.status}</p> */}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Call */}
        <button
          type="button"
          className="rounded-lg p-2.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          title="Coming soon"
        >
          <IoCallOutline className="h-5 w-5" />
        </button>

        {/* More */}
        <button
          type="button"
          className="rounded-lg p-2.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          title="Coming soon"
        >
          <FiMoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;

// function ChatHeader({ receiver }) {
//   return (
//     <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3">
//       <div className="flex items-center gap-3">
//         <img
//           src={receiver?.avatar || "https://i.pravatar.cc/150?img=12"}
//           alt={receiver?.name || "User"}
//           className="h-11 w-11 rounded-full object-cover"
//         />

//         <div>
//           <h2 className="text-sm font-semibold text-gray-900">
//             {receiver?.name}
//           </h2>

//           {/* Socket.IO will replace this */}
//           <p className="text-xs text-gray-400">Offline</p>
//         </div>
//       </div>

//       <div className="flex gap-1">
//         <button
//           type="button"
//           className="rounded-lg p-2.5 text-gray-500 hover:bg-gray-100"
//         >
//           📞
//         </button>

//         <button
//           type="button"
//           className="rounded-lg p-2.5 text-gray-500 hover:bg-gray-100"
//         >
//           ⋮
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatHeader;

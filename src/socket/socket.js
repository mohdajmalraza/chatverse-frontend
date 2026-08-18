import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const socket = io(SOCKET_URL, {
  withCredentials: true, // Allows cookies to be sent with the Socket.IO handshake
  autoConnect: false, // Prevents Socket.IO from connecting automatically
});

import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  withCredentials: true, // Allows cookies to be sent with the Socket.IO handshake
  autoConnect: false, // Prevents Socket.IO from connecting automatically
});

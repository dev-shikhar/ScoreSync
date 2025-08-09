import { io } from "socket.io-client";

console.log(import.meta.env.VITE_BACKEND_URL);
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  autoConnect: false,
});

export default socket;

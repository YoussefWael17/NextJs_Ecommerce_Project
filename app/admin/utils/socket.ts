import { io } from "socket.io-client";

const token =
  typeof window !== "undefined"
    ? localStorage.getItem("userToken")
    : null;

export const socket = io("http://localhost:5000", {
  auth: {
    token,
  },
  autoConnect: false,
});
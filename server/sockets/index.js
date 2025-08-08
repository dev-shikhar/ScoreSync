import { dailyMatches } from "./dailyMatches.js";
import { liveFeedHandler } from "./livefeed.js";
import { matchDetails } from "./matchDetails.js";

export function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    liveFeedHandler(socket);
    dailyMatches(socket);
    matchDetails(socket);
  });
}
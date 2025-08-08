import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongoDb.js";
import router from "./routes/soccer.js";
import { registerSocketHandlers } from "./sockets/index.js";


dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
});

registerSocketHandlers(io);

connectDB();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(router);


httpServer.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});

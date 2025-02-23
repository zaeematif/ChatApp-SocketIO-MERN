import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app, server, io} from './lib/socket.js'
import path from 'path'

dotenv.config();

const port = process.env.PORT || 3000;
const __dirname = path.resolve();

//middleware
app.use(express.json());
app.use(cookieParser()); //allows to parse cookie
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from Vite
    credentials: true, // Allow cookies and authentication headers
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"], // Ensure PUT is allowed
  })
);

//auth route
app.use("/api/auth", authRoutes);

//mssg route
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}

const start = () => {
  try {
    connectDB();

    server.listen(port, () => {
      console.log(`Server Listning on PORT: ${port}`);
    });
  } catch (error) {
    console.log("Server Issues");
  }
};

start();

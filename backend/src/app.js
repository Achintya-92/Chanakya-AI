import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aiRoute from "./routes/aiRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chanakya-ai-10.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());

// Test Route
app.get("/", (req, res) => { 
  res.send("Lakshya API Running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai/Chats",aiRoute);
export default app;

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aiRoute from "./routes/aiRoutes.js";

const app = express();

// Middleware
app.use(cors({
  origin: [
    "https://chanakya-ai-kappa.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));


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

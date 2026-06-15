import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => { 
  res.send("Lakshya API Running...");
});

// Routes
app.use("/api/auth",(req,res)=>{
  res.send("api/auth");
}, authRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);


export default app;

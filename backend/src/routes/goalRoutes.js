import express from "express";

import {
  createGoal,
  getGoals,
  getGoalById,
  deleteGoal,
  getTodoById,
getRoadmapById,
getSystemById,
} from "../controllers/goalController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/todo/:id",protect, getTodoById);

router.get("/roadmap/:id",protect,getRoadmapById);
router.get("/system/:id",protect, getSystemById);

router.get("/:id",protect, getGoalById);

router.delete("/:id", protect, deleteGoal);

router.get("/",protect, getGoals);

router.post("/", protect, createGoal);

export default router;
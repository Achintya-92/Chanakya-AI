import express from "express";

import {
  createGoal,
  getGoalByUserId,
  deleteGoal,
  getTodoById,
getRoadmapById,
getSystemById,
getGoalById,
} from "../controllers/goalController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/todo/:id",protect, getTodoById);

router.get("/roadmap/:id",protect,getRoadmapById);

router.get("/system/:id",protect, getSystemById);

router.delete("/:id", protect, deleteGoal);

router.get("/",protect, getGoalByUserId);

router.get("/goal/:id",protect, getGoalById);

router.post("/", protect, createGoal);

export default router;
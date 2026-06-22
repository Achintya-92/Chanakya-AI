import express from "express";

import {
  createGoal,
  getGoalByUserId,
  deleteGoal,
  getTodoById,
getRoadmapById,
getSystemById,
getGoalById,
updateGoal
} from "../controllers/goalController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/todo/:id",protect, getTodoById);

router.get("/roadmap/:id",protect,getRoadmapById);

router.get("/system/:id",protect, getSystemById);

router.get("/",protect, getGoalByUserId);

router.get("/goal/:id",protect, getGoalById);

router.post("/", protect, createGoal);

router.delete("/goal/delete/:id",protect,deleteGoal);

router.put("/goal/update/:id",protect,updateGoal);



export default router;
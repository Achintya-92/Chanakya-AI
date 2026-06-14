import express from "express";

const router = express.Router();

import {protect} from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Goal from "../models/Goal.js";

router.get("/me", protect, async (req, res) => {
  console.log(req);
  try {
    const user = await User.findById(req.user.id).select("-password");

    const goal = await Goal.findOne({
      userId: req.user.id,
    });

    res.json({
      success: true,
      user,
      hasGoal: !!goal,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
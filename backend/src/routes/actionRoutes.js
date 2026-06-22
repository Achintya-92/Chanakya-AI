import express from "express";

const router = express.Router();

import {protect} from "../middleware/authMiddleware.js";
import {updateAction,CreateAction} from "../controllers/ActionController.js";


router.put("/update",protect,updateAction);
router.post("/today",protect,CreateAction);
router.post("/generatenext",protect,CreateAction)
export default router;
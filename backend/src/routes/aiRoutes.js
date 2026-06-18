import express from "express";

import {createChat,getChats,getChat} from "../controllers/aiChatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/chat/:Id",protect,getChat);
router.get("/:userId",protect,getChats);
router.post("/send",protect,createChat);

export default router;
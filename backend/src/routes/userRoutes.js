import express from "express";

const router = express.Router();

import {protect} from "../middleware/authMiddleware.js";
import {getUserData,getFeedback, Sendfeedback,updateUsername,updatePassword} from "../controllers/userController.js";

router.get("/me", protect,getUserData);
router.get("/getFeedback",protect,getFeedback);
router.put("/updateName",protect,updateUsername);
router.put("/updatePsw",protect,updatePassword);
router.post("/feedback",protect, Sendfeedback);


export default router;
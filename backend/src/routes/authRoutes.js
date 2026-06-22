import express from "express";
import { register, login } from "../controllers/authController.js";
import { emailSend,resendOTP,verifyOTP} from "../controllers/emailController.js";
import {verify} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",verify, register);
router.post("/login",verify, login);

router.post("/send", emailSend);

router.post("/verify-email",verifyOTP);

router.post("/resend-otp", resendOTP);

export default router;
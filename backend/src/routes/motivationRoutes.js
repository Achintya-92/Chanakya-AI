import express from "express";

import { getMotivation } from "../controllers/motivationController.js";

const router = express.Router();

router.get("/", getMotivation);

export default router;
import express from "express";
import { registerUser, signIn } from "../controllers/auth.js";
const router = express.Router();

router.post("/api/signup", registerUser);
router.post("/api/signin", signIn);

export default router;

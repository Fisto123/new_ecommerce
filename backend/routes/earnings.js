import express from "express";
import { getEarningsStats, getOneWeekSales } from "../controllers/earnings.js";
const router = express.Router();

router.get("/api/getEarnings", getEarningsStats);
router.get("/api/getWeeklyEarnings", getOneWeekSales);

export default router;

import express from "express";
import {
  createOrder,
  stripePayment,
  webHookPayment,
} from "../controllers/stripe.js";
const router = express.Router();

router.post("/api/payment", stripePayment);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webHookPayment
);
router.post("/createorder", createOrder);
export default router;

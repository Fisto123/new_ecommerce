import express from "express";
import { getAllOrders, getOrderById, getOrderStats, updateOrder } from "../controllers/orders.js";
const router = express.Router();

router.get("/api/getOrder", getOrderStats);
router.get("/api/geAllOrder", getAllOrders);
router.put("/api/updateOrder/:id", updateOrder);
router.get("/api/getOrder/:id", getOrderById);
export default router;

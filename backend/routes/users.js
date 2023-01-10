import express from "express";
import { deleteUser, getAllUsers, getUser, getUserStats, updateUser } from "../controllers/user.js";
const router = express.Router();

router.get("/api/getUser", getUserStats);
router.get("/api/getUserId/:id", getUser);
router.get("/api/getAllUsers", getAllUsers);
router.delete("/api/deleteUser/:id", deleteUser);
router.put("/api/updateUser/:id", updateUser);
export default router;

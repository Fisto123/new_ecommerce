import express from "express";
import {
  createProduct,
  deleteProductById,
  getProduct,
  getProductById,
  UpdateProduct,
} from "../controllers/product.js";
import { auth } from "../verify.js";
const router = express.Router();

router.post("/api/createProduct", createProduct);
router.get("/api/getProduct",  getProduct);
router.get("/api/getProductById/:id", getProductById);
router.delete("/api/deleteProductById/:id", deleteProductById);
router.patch("/api/editProduct/:id", UpdateProduct);
export default router;

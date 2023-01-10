import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import stripeRouter from "./routes/stripe.js";
import productRouter from "./routes/products.js";
import userRouter from "./routes/users.js";
import ordersRouter from "./routes/orders.js";
import earningsRouter from "./routes/earnings.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());

/* ROUTES */
app.use("/products", productRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/orders", ordersRouter);
app.use("/earnings", earningsRouter);
app.use("/stripe", stripeRouter);
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

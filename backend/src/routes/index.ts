import "express-async-errors";
import { Router } from "express";
import userRouter from "./user.route";
import paymentRouter from "./payment.route";

const router = Router();

router.use("/api/v1/organic", userRouter);

router.use("/api/v1/organic", paymentRouter);

export default router;

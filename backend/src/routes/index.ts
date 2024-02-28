import "express-async-errors";
import { Router } from "express";
import userRouter from "./user.route";

const router = Router();

router.use("/api/v1/organic", userRouter);

export default router;

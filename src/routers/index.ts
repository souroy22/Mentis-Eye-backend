import express from "express";
import authRouter from "./auth.routers";
import recordRouter from "./record.routers";
import userRouter from "./user.routers";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/record", recordRouter);
router.use("/user", userRouter);

export default router;

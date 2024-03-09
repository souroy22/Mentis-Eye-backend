import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import userController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/get-user", verifyToken, userController.getUser);

export default userRouter;

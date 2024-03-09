import express from "express";
import checkMissingFields from "../middlewares/checkMissingFields.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import recordController from "../controllers/record.controller";
import checkDatabaseName from "../middlewares/checkDatabaseName";

const recordRouter = express.Router();

recordRouter.post(
  "/create-bulk",
  verifyToken,
  checkDatabaseName,
  recordController.createAllRecords
);
recordRouter.get("/:database", verifyToken, recordController.getRecords);
recordRouter.post(
  "/create",
  verifyToken,
  checkMissingFields.createNewRecord,
  checkDatabaseName,
  recordController.createANewRecord
);

export default recordRouter;

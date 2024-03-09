import { NextFunction, Request, Response } from "express";
import { databases } from "../services/constants";

const checkDatabaseName = (req: Request, res: Response, next: NextFunction) => {
  const isCorrect = Object.keys(databases).includes(req.body.database);
  if (!isCorrect) {
    return res.status(404).json({ error: "No such db name found" });
  }
  next();
};

export default checkDatabaseName;

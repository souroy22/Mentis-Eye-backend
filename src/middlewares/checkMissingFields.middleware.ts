import { NextFunction, Request, Response } from "express";

const checkMissingFields = {
  signup: (req: Request, res: Response, next: NextFunction) => {
    const requiredFields: string[] = ["name", "username", "password"];
    const missingFields: string[] = [];

    // Check if any required field is missing or blank
    requiredFields.forEach((field) => {
      if (!req.body[field] || req.body[field].trim() === "") {
        missingFields.push(field);
      }
    });

    // If any field is missing or blank, send an error response
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing or blank fields: ${missingFields.join(", ")}`,
      });
    }

    // No missing or blank fields, proceed to the next middleware
    next();
  },
  signin: (req: Request, res: Response, next: NextFunction) => {
    const requiredFields: string[] = ["username", "password"];
    const missingFields: string[] = [];

    // Check if any required field is missing or blank
    requiredFields.forEach((field) => {
      if (!req.body[field] || req.body[field].trim() === "") {
        missingFields.push(field);
      }
    });

    // If any field is missing or blank, send an error response
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Plese fill all required fields",
        missingFields,
      });
    }

    // No missing or blank fields, proceed to the next middleware
    next();
  },
  createNewRecord: (req: Request, res: Response, next: NextFunction) => {
    const requiredFields: string[] = [
      "name",
      "userEmail",
      "userPhone",
      "database",
    ];
    const missingFields: string[] = [];

    // Check if any required field is missing or blank
    requiredFields.forEach((field) => {
      if (!req.body[field] || req.body[field].trim() === "") {
        missingFields.push(field);
      }
    });

    // If any field is missing or blank, send an error response
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Plese fill all required fields",
        missingFields,
      });
    }

    // No missing or blank fields, proceed to the next middleware
    next();
  },
};

export default checkMissingFields;

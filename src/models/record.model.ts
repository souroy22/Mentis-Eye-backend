// src/models/record
import mongoose from "mongoose";
import { connection1, connection2, connection3 } from "../db/dbConnect";

export interface IRecord extends Document {
  name: string;
  userEmail: string;
  userPhone: string;
  slug: string;
}

// Define schema for the records
const recordSchema = new mongoose.Schema<IRecord>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: false,
    },
    userPhone: {
      type: String,
      required: true,
      unique: false,
    },
    slug: {
      type: String,
      default: null,
      unique: true,
    },
  },
  { timestamps: true }
);

// Create models for each database
const Record1 = connection1.model<IRecord>("Record1", recordSchema);
const Record2 = connection2.model<IRecord>("Record2", recordSchema);
const Record3 = connection3.model<IRecord>("Record3", recordSchema);

export { Record1, Record2, Record3 };

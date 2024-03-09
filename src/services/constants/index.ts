import { Model } from "mongoose";
import { IRecord, Record1, Record2, Record3 } from "../../models/record.model";

type RecordModel = Model<IRecord>;

export const databases: { [key: string]: RecordModel } = {
  DATABASE_1: Record1,
  DATABASE_2: Record2,
  DATABASE_3: Record3,
};

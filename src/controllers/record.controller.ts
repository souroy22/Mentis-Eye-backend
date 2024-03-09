import { Request, Response } from "express";
import { Document } from "mongoose";
import slugify from "slugify";
import ShortUniqueId from "short-unique-id";
import { databases } from "../services/constants";

const uid = new ShortUniqueId({ length: 4 });

const recordController = {
  createAllRecords: async (req: Request, res: Response) => {
    try {
      const { records, database } = req.body;
      const Record = databases[database];
      for (let record of records) {
        let slug: string = slugify(record.name, { lower: true });
        const isExist = await Record.findOne({ slug });
        if (isExist) {
          slug = slug + "-" + uid.rnd();
        }
        const newRecord = new Record({
          ...record,
          slug,
        });
        await newRecord.save();
      }
      return res.status(200).json({ msg: "All records created successfully" });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong!" });
      }
    }
  },
  getRecords: async (req: Request, res: Response) => {
    try {
      const { database } = req.params;
      let { limit = 10, page = 1, sortBy, searchValue, sortOrder } = req.query;
      limit = Math.abs(Number(limit));
      let pageCount = (Math.abs(Number(page)) || 1) - 1;
      const Record = databases[database];
      const sortCriteria: any = {};
      if (sortBy) {
        sortCriteria[sortBy as string] = sortOrder === "asc" ? 1 : -1;
      }
      sortCriteria["createdAt"] = -1;
      const searchQuery = searchValue
        ? {
            $or: [
              { name: { $regex: searchValue as string, $options: "i" } }, // Case-insensitive search
              { userEmail: { $regex: searchValue as string, $options: "i" } },
              { userPhone: { $regex: searchValue as string, $options: "i" } },
            ],
          }
        : {};
      const totalCount = await Record.countDocuments(searchQuery);
      const records = (await Record.find(searchQuery, {
        name: 1,
        userEmail: 1,
        userPhone: 1,
        slug: 1,
        _id: 0,
      })
        .sort(sortCriteria)
        .limit(limit)
        .skip(limit * pageCount)) as Document[];
      return res.status(200).json({ records, totalCount });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong!" });
      }
    }
  },
  createANewRecord: async (req: Request, res: Response) => {
    try {
      const { name, userEmail, userPhone, database } = req.body;
      const Record = databases[database];
      let slug: string = slugify(name, { lower: true });
      const isExist = await Record.findOne({ slug });
      if (isExist) {
        slug = slug + "-" + uid.rnd();
      }
      const newRecord = new Record({
        name,
        userEmail,
        userPhone,
        slug,
      });
      await newRecord.save();
      return res.status(200).json({
        name: newRecord.name,
        userEmail: newRecord.userEmail,
        userPhone: newRecord.userPhone,
        slug: newRecord.slug,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong!" });
      }
    }
  },
};

export default recordController;

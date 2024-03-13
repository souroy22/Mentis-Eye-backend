"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slugify_1 = __importDefault(require("slugify"));
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const constants_1 = require("../services/constants");
const uid = new short_unique_id_1.default({ length: 4 });
const recordController = {
    createAllRecords: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { records, database } = req.body;
            const Record = constants_1.databases[database];
            for (let record of records) {
                let slug = (0, slugify_1.default)(record.name, { lower: true });
                const isExist = yield Record.findOne({ slug });
                if (isExist) {
                    slug = slug + "-" + uid.rnd();
                }
                const newRecord = new Record(Object.assign(Object.assign({}, record), { slug }));
                yield newRecord.save();
            }
            return res.status(200).json({ msg: "All records created successfully" });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }
    }),
    getRecords: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { database } = req.params;
            let { limit = 10, page = 1, sortBy, searchValue, sortOrder } = req.query;
            limit = Math.abs(Number(limit));
            let pageCount = (Math.abs(Number(page)) || 1) - 1;
            const Record = constants_1.databases[database];
            const sortCriteria = {};
            if (sortBy) {
                sortCriteria[sortBy] = sortOrder === "asc" ? 1 : -1;
            }
            sortCriteria["createdAt"] = -1;
            const searchQuery = searchValue
                ? {
                    $or: [
                        { name: { $regex: searchValue, $options: "i" } }, // Case-insensitive search
                        { userEmail: { $regex: searchValue, $options: "i" } },
                        { userPhone: { $regex: searchValue, $options: "i" } },
                    ],
                }
                : {};
            const totalCount = yield Record.countDocuments(searchQuery);
            const records = (yield Record.find(searchQuery, {
                name: 1,
                userEmail: 1,
                userPhone: 1,
                slug: 1,
                _id: 0,
            })
                .sort(sortCriteria)
                .limit(limit)
                .skip(limit * pageCount));
            return res.status(200).json({ records, totalCount });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }
    }),
    createANewRecord: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, userEmail, userPhone, database } = req.body;
            const Record = constants_1.databases[database];
            let slug = (0, slugify_1.default)(name, { lower: true });
            const isExist = yield Record.findOne({ slug });
            if (isExist) {
                slug = slug + "-" + uid.rnd();
            }
            const newRecord = new Record({
                name,
                userEmail,
                userPhone,
                slug,
            });
            yield newRecord.save();
            return res.status(200).json({
                name: newRecord.name,
                userEmail: newRecord.userEmail,
                userPhone: newRecord.userPhone,
                slug: newRecord.slug,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }
    }),
};
exports.default = recordController;
//# sourceMappingURL=record.controller.js.map
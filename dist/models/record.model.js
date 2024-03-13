"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record3 = exports.Record2 = exports.Record1 = void 0;
// src/models/record
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect_1 = require("../db/dbConnect");
// Define schema for the records
const recordSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
// Create models for each database
const Record1 = dbConnect_1.connection1.model("Record1", recordSchema);
exports.Record1 = Record1;
const Record2 = dbConnect_1.connection2.model("Record2", recordSchema);
exports.Record2 = Record2;
const Record3 = dbConnect_1.connection3.model("Record3", recordSchema);
exports.Record3 = Record3;
//# sourceMappingURL=record.model.js.map
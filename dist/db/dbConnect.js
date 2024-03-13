"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection4 = exports.connection3 = exports.connection2 = exports.connection1 = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connection1 = mongoose_1.default.createConnection(process.env.MONGO_URI_1 || "");
exports.connection1 = connection1;
const connection2 = mongoose_1.default.createConnection(process.env.MONGO_URI_2 || "");
exports.connection2 = connection2;
const connection3 = mongoose_1.default.createConnection(process.env.MONGO_URI_3 || "");
exports.connection3 = connection3;
const connection4 = mongoose_1.default.createConnection(process.env.MONGO_URI || "");
exports.connection4 = connection4;
connection1.on("error", console.error.bind(console, "Connection error:"));
connection2.on("error", console.error.bind(console, "Connection error:"));
connection3.on("error", console.error.bind(console, "Connection error:"));
connection4.on("error", console.error.bind(console, "Connection error:"));
connection1.once("open", () => console.log(`Successfully connected to DATABASE 1`));
connection2.once("open", () => console.log(`Successfully connected to DATABASE 2`));
connection3.once("open", () => console.log(`Successfully connected to DATABASE 3`));
connection4.once("open", () => console.log(`Successfully connected to DATABASE 4`));
//# sourceMappingURL=dbConnect.js.map
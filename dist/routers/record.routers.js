"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkMissingFields_middleware_1 = __importDefault(require("../middlewares/checkMissingFields.middleware"));
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const record_controller_1 = __importDefault(require("../controllers/record.controller"));
const checkDatabaseName_1 = __importDefault(require("../middlewares/checkDatabaseName"));
const recordRouter = express_1.default.Router();
recordRouter.post("/create-bulk", verifyToken_middleware_1.verifyToken, checkDatabaseName_1.default, record_controller_1.default.createAllRecords);
recordRouter.get("/:database", verifyToken_middleware_1.verifyToken, record_controller_1.default.getRecords);
recordRouter.post("/create", verifyToken_middleware_1.verifyToken, checkMissingFields_middleware_1.default.createNewRecord, checkDatabaseName_1.default, record_controller_1.default.createANewRecord);
exports.default = recordRouter;
//# sourceMappingURL=record.routers.js.map
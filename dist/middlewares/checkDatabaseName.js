"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../services/constants");
const checkDatabaseName = (req, res, next) => {
    const isCorrect = Object.keys(constants_1.databases).includes(req.body.database);
    if (!isCorrect) {
        return res.status(404).json({ error: "No such db name found" });
    }
    next();
};
exports.default = checkDatabaseName;
//# sourceMappingURL=checkDatabaseName.js.map
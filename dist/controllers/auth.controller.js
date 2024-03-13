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
const user_model_1 = __importDefault(require("../models/user.model"));
const getUser_util_1 = __importDefault(require("../services/utils/getUser.util"));
const verifyPassword_util_1 = __importDefault(require("../services/utils/verifyPassword.util"));
const generateToken_util_1 = __importDefault(require("../services/utils/generateToken.util"));
const destroyToken_util_1 = __importDefault(require("../services/utils/destroyToken.util"));
const authControllers = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, username, password } = req.body;
            const isExist = yield (0, getUser_util_1.default)(username);
            if (isExist !== null) {
                return res
                    .status(400)
                    .json({ error: "This mail id is already exist." });
            }
            let newUser = new user_model_1.default({ name, username, password });
            newUser = yield newUser.save();
            const user = {
                name: newUser.name,
                username: newUser.username,
            };
            const token = yield (0, generateToken_util_1.default)({
                id: newUser._id,
                username: user.username,
            });
            return res.status(200).json({
                user,
                token,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }
    }),
    signin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const isExist = yield (0, getUser_util_1.default)(username);
            if (isExist === null) {
                return res.status(404).json({ error: "This mailid doesn't exists" });
            }
            const match = yield (0, verifyPassword_util_1.default)(password, isExist.password);
            if (!match) {
                return res
                    .status(401)
                    .json({ error: "EmailId or password doesn't match" });
            }
            const user = {
                name: isExist.name,
                username: isExist.email,
            };
            const token = yield (0, generateToken_util_1.default)({
                id: isExist._id,
                username: user.username,
            });
            return res.status(200).json({
                user,
                token,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: error.message });
            }
        }
    }),
    signout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, destroyToken_util_1.default)(req);
            return res.status(200).json({ msg: "Successfully logged out!" });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: "Something went wrong" });
            }
        }
    }),
};
exports.default = authControllers;
//# sourceMappingURL=auth.controller.js.map
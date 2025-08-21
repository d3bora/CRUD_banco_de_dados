"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = __importDefault(require("../controllers/userController"));
var useRouter = (0, express_1.default)();
useRouter.get("/", userController_1.default.listAllUsers);
useRouter.post("/", userController_1.default.createUser);
exports.default = useRouter;

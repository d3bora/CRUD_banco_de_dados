"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userRouter_1 = __importDefault(require("./userRouter"));
var router = (0, express_1.default)();
router.use("/", userRouter_1.default);
exports.default = userRouter_1.default;

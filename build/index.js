"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use("/", routes_1.default);
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});

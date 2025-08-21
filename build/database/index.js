"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var config = {
    user: "postgres",
    host: "localhost",
    database: "database_01",
    password: "root",
    port: 5433,
};
var db = new pg_1.Pool(config);
db.connect(function (err) {
    if (err) {
        return console.error("Erro ao conectar ao PostgreSQL", err.stack);
    }
    console.log("Conexão com o PostgreSQL estabelecida com sucesso.");
});
exports.default = db;

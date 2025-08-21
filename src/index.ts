import bodyParser from "body-parser";
import express, { Express } from "express";
import router from "./routes";

const app: Express = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// -- Script para criar a tabela de usuários
// CREATE TABLE usuarios (
//     id SERIAL PRIMARY KEY,
//     cpf BIGINT UNIQUE NOT NULL,
//     nome VARCHAR(100) NOT NULL,
//     data_nascimento DATE NOT NULL
// );

// -- Script para criar a tabela de produtos
// CREATE TABLE produtos (
//     id SERIAL PRIMARY KEY,
//     nome VARCHAR(100) NOT NULL,
//     preco NUMERIC(10, 2) NOT NULL
// );

// -- Script para criar a tabela de pedidos
// CREATE TABLE pedidos (
//     id SERIAL PRIMARY KEY,
//     usuario_id INT REFERENCES usuarios(id),
//     produto_id INT REFERENCES produtos(id),
//     quantidade INT NOT NULL,
//     data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

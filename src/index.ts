import bodyParser from "body-parser";
import express, { Express } from "express";
import router from "./routes";
import { connectToMongoDB, createIndexes } from "./database";

const app: Express = express();
const port = 4000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas
app.use("/", router);

// Inicializar MongoDB e iniciar servidor
const startServer = async () => {
  try {
    console.log("🔄 Iniciando conexão com MongoDB...");
    
    // Conectar ao MongoDB
    await connectToMongoDB();
    
    console.log("🔄 Criando índices...");
    
    // Criar índices
    await createIndexes();
    
    console.log("🔄 Iniciando servidor Express...");
    
    // Iniciar servidor
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
      console.log(`📊 MongoDB conectado e índices criados`);
      console.log(`✅ Aplicação pronta para receber requisições!`);
    });
  } catch (error) {
    console.error("❌ Erro ao inicializar servidor:", error);
    process.exit(1);
  }
};

// Tratamento de sinais para fechar conexão graciosamente
process.on('SIGINT', async () => {
  console.log('\n🔄 Recebido SIGINT. Fechando servidor...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🔄 Recebido SIGTERM. Fechando servidor...');
  process.exit(0);
});

// Iniciar aplicação
startServer();

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

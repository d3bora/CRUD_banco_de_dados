import { Pool } from "pg";

interface Config {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
  max: number;
  idleTimeoutMillis: number;
  connectionTimeoutMillis: number;
  ssl: {
    rejectUnauthorized: boolean;
  };
}

const config: Config = {
  host: "bd-projeto-logico.cikzh6srg5xu.us-east-1.rds.amazonaws.com",
  user: "professor",
  password: "professor",
  database: "postgres",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: {
    rejectUnauthorized: false
  }
};

const pool = new Pool(config);

// Testar conexão
pool.connect()
  .then(client => {
    console.log("Conexão com o PostgreSQL estabelecida com sucesso.");
    client.release();
  })
  .catch(err => {
    console.error("Erro ao conectar ao PostgreSQL:", err);
  });

export { pool };

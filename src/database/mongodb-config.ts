import { MongoClient, Db } from "mongodb";

interface MongoDBConfig {
  url: string;
  dbName: string;
  options: {
    maxPoolSize: number;
    serverSelectionTimeoutMS: number;
    socketTimeoutMS: number;
  };
}

// Configuração para MongoDB Atlas
const defaultConfig: MongoDBConfig = {
  url: "mongodb+srv://deboragoncalves:xyhrqTlCZAwDPBGf@logico.jln2hwp.mongodb.net/",
  dbName: "logicoapoio",
  options: {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }
};



// Selecionar configuração baseada no ambiente
const config = defaultConfig
let client: MongoClient;
let db: Db;

const connectToMongoDB = async (): Promise<void> => {
  try {
    client = new MongoClient(config.url, config.options);
    await client.connect();
    db = client.db(config.dbName);
    
    // Testar conexão
    await db.command({ ping: 1 });
    console.log("✅ Conexão com o MongoDB estabelecida com sucesso.");
    console.log(`📊 Database: ${config.dbName}`);
    console.log(`🔗 URL: ${config.url}`);
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    throw err;
  }
};

const getDb = (): Db => {
  if (!db) {
    throw new Error("Database não está conectado. Chame connectToMongoDB primeiro.");
  }
  return db;
};

const getClient = (): MongoClient => {
  if (!client) {
    throw new Error("Cliente MongoDB não está conectado. Chame connectToMongoDB primeiro.");
  }
  return client;
};

const closeConnection = async (): Promise<void> => {
  if (client) {
    await client.close();
    console.log("🔌 Conexão com o MongoDB fechada.");
  }
};

// Função para criar índices nas coleções
const createIndexes = async (): Promise<void> => {
  try {
    const db = getDb();
    
    // Função auxiliar para criar índice apenas se não existir
    const createIndexIfNotExists = async (collection: string, indexSpec: any, options?: any) => {
      try {
        await db.collection(collection).createIndex(indexSpec, options);
        return true;
      } catch (error: any) {
        // Se o índice já existe, não é um erro
        if (error.code === 85 || error.message?.includes('already exists')) {
          return false;
        }
        throw error;
      }
    };

    console.log("🔄 Verificando e criando índices necessários...");
    
    // Índices para usuários (coleção principal)
    await createIndexIfNotExists('usuarios', { cpf: 1 }, { unique: true });
    await createIndexIfNotExists('usuarios', { login: 1 }, { unique: true });
    await createIndexIfNotExists('usuarios', { email: 1 });
    await createIndexIfNotExists('usuarios', { tipo_usuario: 1 });
    
    // Índices para dados embutidos de vítimas
    await createIndexIfNotExists('usuarios', { "dados_vitima.escolaridade": 1 });
    await createIndexIfNotExists('usuarios', { "dados_vitima.etnia": 1 });
    await createIndexIfNotExists('usuarios', { "dados_vitima.idade": 1 });
    await createIndexIfNotExists('usuarios', { "dados_vitima.endereco.cidade": 1 });
    await createIndexIfNotExists('usuarios', { "dados_vitima.endereco.estado": 1 });
    
    // Índices para dados embutidos de profissionais
    await createIndexIfNotExists('usuarios', { "dados_profissional.especialidade": 1 });
    await createIndexIfNotExists('usuarios', { "dados_profissional.cargo": 1 });
    await createIndexIfNotExists('usuarios', { "dados_profissional.numero_registro": 1 }, { unique: true });
    
    // Índices para agendamentos
    await createIndexIfNotExists('agendamentos', { data: 1, hora: 1 });
    await createIndexIfNotExists('agendamentos', { profissional_id: 1 });
    await createIndexIfNotExists('agendamentos', { paciente_id: 1 });
    await createIndexIfNotExists('agendamentos', { status: 1 });
    await createIndexIfNotExists('agendamentos', { "profissional_id": 1, "data": 1, "hora": 1 });
    await createIndexIfNotExists('agendamentos', { "paciente_id": 1, "data": 1, "hora": 1 });
    
    console.log("✅ Índices verificados e criados conforme necessário.");
  } catch (error) {
    console.error("❌ Erro ao verificar/criar índices:", error);
    // Não falhar a aplicação se houver erro nos índices
    console.log("⚠️ Continuando sem alguns índices...");
  }
};

export { 
  config, 
  connectToMongoDB, 
  getDb, 
  getClient, 
  closeConnection, 
  createIndexes 
};

import { IVitima } from "../controllers/vitimaController";
import { pool } from "../database";

// Interface para dados do usuário
interface IUsuario {
  cpf: string;
  telefone: string | null;
  senha: string;
  login: string;
  email: string | null;
  tipo_usuario: 'vítima' | 'profissional';
  nome: string | null;
  sobrenome: string | null;
  data_cadastro: Date | null;
}

// Interface para dados da vítima
interface IVitimaCreate {
  endereco: string | null;
  data_nascimento: Date | null;
  idade: number | null;
  escolaridade: string | null;
  etnia: string | null;
}

const vitimaService = {
  createVitima: async (
    usuarioData: IUsuario,
    vitimaData: IVitimaCreate
  ): Promise<IVitima> => {
    const client = await pool.connect();
    
    try {
      // Iniciar transação
      await client.query('BEGIN');

      // 1. Criar usuário primeiro
      const usuarioResult = await client.query(
        `INSERT INTO usuario (cpf, telefone, senha, login, email, tipo_usuario, nome, sobrenome, data_cadastro)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING id_usuario`,
        [
          usuarioData.cpf,
          usuarioData.telefone,
          usuarioData.senha,
          usuarioData.login,
          usuarioData.email,
          usuarioData.tipo_usuario,
          usuarioData.nome,
          usuarioData.sobrenome,
          usuarioData.data_cadastro
        ]
      );

      const userId = usuarioResult.rows[0].id_usuario;

      // 2. Criar vítima usando o ID do usuário
      const vitimaResult = await client.query(
        `INSERT INTO vitima (id_vitima, endereco, data_nascimento, idade, escolaridade, etnia)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [
          userId,
          vitimaData.endereco,
          vitimaData.data_nascimento,
          vitimaData.idade,
          vitimaData.escolaridade,
          vitimaData.etnia
        ]
      );

      // Commit da transação
      await client.query('COMMIT');

      return vitimaResult.rows[0];
    } catch (error) {
      // Rollback em caso de erro
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  listVitimaById: async (id: number): Promise<IVitima | undefined> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM vitima WHERE id_vitima = $1`,
        [id]
      );

      return result.rows.length > 0 ? result.rows[0] : undefined;
    } finally {
      client.release();
    }
  },

  updateVitima: async (
    id: number,
    endereco: string | null,
    data_nascimento: Date | null,
    idade: number | null,
    escolaridade: string | null,
    etnia: string | null
  ): Promise<IVitima | undefined> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `UPDATE vitima 
         SET endereco = $1, data_nascimento = $2, idade = $3, escolaridade = $4, etnia = $5
         WHERE id_vitima = $6
         RETURNING *`,
        [endereco, data_nascimento, idade, escolaridade, etnia, id]
      );

      return result.rows.length > 0 ? result.rows[0] : undefined;
    } finally {
      client.release();
    }
  },

  deleteVitima: async (id: number): Promise<boolean> => {
    const client = await pool.connect();
    
    try {
      // Iniciar transação para deletar usuário + vítima
      await client.query('BEGIN');

      // 1. Deletar vítima primeiro (devido à chave estrangeira)
      const vitimaResult = await client.query(
        `DELETE FROM vitima WHERE id_vitima = $1`,
        [id]
      );

      // 2. Deletar usuário
      const usuarioResult = await client.query(
        `DELETE FROM usuario WHERE id_usuario = $1`,
        [id]
      );

      // Commit da transação
      await client.query('COMMIT');

      return (vitimaResult.rowCount || 0) > 0;
    } catch (error) {
      // Rollback em caso de erro
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  listAllVitimas: async (): Promise<IVitima[]> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM vitima`
      );

      return result.rows;
    } finally {
      client.release();
    }
  },

  getVitimaByEscolaridade: async (escolaridade: string): Promise<IVitima[]> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM vitima WHERE escolaridade = $1`,
        [escolaridade]
      );

      return result.rows;
    } finally {
      client.release();
    }
  },

  getVitimaByEtnia: async (etnia: string): Promise<IVitima[]> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM vitima WHERE etnia = $1`,
        [etnia]
      );

      return result.rows;
    } finally {
      client.release();
    }
  },

  updateVitimaEndereco: async (id: number, endereco: string): Promise<IVitima | undefined> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `UPDATE vitima SET endereco = $1 WHERE id_vitima = $2 RETURNING *`,
        [endereco, id]
      );

      return result.rows.length > 0 ? result.rows[0] : undefined;
    } finally {
      client.release();
    }
  },

  updateVitimaEscolaridade: async (id: number, escolaridade: string): Promise<IVitima | undefined> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `UPDATE vitima SET escolaridade = $1 WHERE id_vitima = $2 RETURNING *`,
        [escolaridade, id]
      );

      return result.rows.length > 0 ? result.rows[0] : undefined;
    } finally {
      client.release();
    }
  }
};

export default vitimaService;

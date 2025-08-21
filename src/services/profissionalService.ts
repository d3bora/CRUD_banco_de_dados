import { IProfissional } from "../controllers/profissionalController";
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

// Interface para dados do profissional
interface IProfissionalCreate {
  numero_registro: string | null;
  cargo: string | null;
  especialidade: string | null;
}

const profissionalService = {
  createProfissional: async (
    usuarioData: IUsuario,
    profissionalData: IProfissionalCreate
  ): Promise<IProfissional> => {
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

      // 2. Criar profissional usando o ID do usuário
      const profissionalResult = await client.query(
        `INSERT INTO profissionalsaude (id_profissional, numero_registro, cargo, especialidade)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [
          userId,
          profissionalData.numero_registro,
          profissionalData.cargo,
          profissionalData.especialidade
        ]
      );

      // Commit da transação
      await client.query('COMMIT');

      return profissionalResult.rows[0];
    } catch (error) {
      // Rollback em caso de erro
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  listProfissionalById: async (id: number): Promise<IProfissional | undefined> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM profissionalsaude WHERE id_profissional = $1`,
        [id]
      );

      return result.rows.length > 0 ? result.rows[0] : undefined;
    } finally {
      client.release();
    }
  },

  updateProfissional: async (
    id: number,
    numero_registro: string | null,
    cargo: string | null,
    especialidade: string | null
  ): Promise<IProfissional | undefined> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `UPDATE profissionalsaude 
         SET numero_registro = $1, cargo = $2, especialidade = $3
         WHERE id_profissional = $4
         RETURNING *`,
        [numero_registro, cargo, especialidade, id]
      );

      return result.rows.length > 0 ? result.rows[0] : undefined;
    } finally {
      client.release();
    }
  },

  deleteProfissional: async (id: number): Promise<boolean> => {
    const client = await pool.connect();
    
    try {
      // Iniciar transação para deletar usuário + profissional
      await client.query('BEGIN');

      // 1. Deletar profissional primeiro (devido à chave estrangeira)
      const profissionalResult = await client.query(
        `DELETE FROM profissionalsaude WHERE id_profissional = $1`,
        [id]
      );

      // 2. Deletar usuário
      const usuarioResult = await client.query(
        `DELETE FROM usuario WHERE id_usuario = $1`,
        [id]
      );

      // Commit da transação
      await client.query('COMMIT');

      return (profissionalResult.rowCount || 0) > 0;
    } catch (error) {
      // Rollback em caso de erro
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  listAllProfissionais: async (): Promise<IProfissional[]> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM profissionalsaude`
      );

      return result.rows;
    } finally {
      client.release();
    }
  },

  getProfissionaisByEspecialidade: async (especialidade: string): Promise<IProfissional[]> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM profissionalsaude WHERE especialidade = $1`,
        [especialidade]
      );

      return result.rows;
    } finally {
      client.release();
    }
  },

  getProfissionaisByCargo: async (cargo: string): Promise<IProfissional[]> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM profissionalsaude WHERE cargo = $1`,
        [cargo]
      );

      return result.rows;
    } finally {
      client.release();
    }
  },

  updateProfissionalEspecialidade: async (id: number, especialidade: string): Promise<IProfissional | undefined> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `UPDATE profissionalsaude SET especialidade = $1 WHERE id_profissional = $2 RETURNING *`,
        [especialidade, id]
      );

      return result.rows.length > 0 ? result.rows[0] : undefined;
    } finally {
      client.release();
    }
  },

  updateProfissionalCargo: async (id: number, cargo: string): Promise<IProfissional | undefined> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `UPDATE profissionalsaude SET cargo = $1 WHERE id_profissional = $2 RETURNING *`,
        [cargo, id]
      );

      return result.rows.length > 0 ? result.rows[0] : undefined;
    } finally {
      client.release();
    }
  }
};

export default profissionalService;


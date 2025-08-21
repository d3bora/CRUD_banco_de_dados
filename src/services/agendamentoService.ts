import { IAgendamento } from "../controllers/agendamentoController";
import { pool } from "../database";

const agendamentoService = {
  createAgendamento: async (
    data: Date | null,
    hora: string | null,
    profissional_id: number | null,
    paciente_id: number | null,
    status: string | null
  ): Promise<IAgendamento> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `INSERT INTO agendamento (data, hora, profissional_id, paciente_id, status)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [data, hora, profissional_id, paciente_id, status]
      );

      return result.rows[0];
    } finally {
      client.release();
    }
  },

  listAgendamentoById: async (id: number): Promise<IAgendamento | undefined> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM agendamento WHERE id_agendamento = $1`,
        [id]
      );

      return result.rows.length > 0 ? result.rows[0] : undefined;
    } finally {
      client.release();
    }
  },

  updateAgendamento: async (
    id: number,
    data: Date | null,
    hora: string | null,
    profissional_id: number | null,
    paciente_id: number | null,
    status: string | null
  ): Promise<IAgendamento | undefined> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `UPDATE agendamento 
         SET data = $1, hora = $2, profissional_id = $3, paciente_id = $4, status = $5
         WHERE id_agendamento = $6
         RETURNING *`,
        [data, hora, profissional_id, paciente_id, status, id]
      );

      return result.rows.length > 0 ? result.rows[0] : undefined;
    } finally {
      client.release();
    }
  },

  deleteAgendamento: async (id: number): Promise<boolean> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `DELETE FROM agendamento WHERE id_agendamento = $1`,
        [id]
      );

      return (result.rowCount || 0) > 0;
    } finally {
      client.release();
    }
  },

  listAllAgendamentos: async (): Promise<IAgendamento[]> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM agendamento ORDER BY data, hora`
      );

      return result.rows;
    } finally {
      client.release();
    }
  },

  getAgendamentosByProfissional: async (profissional_id: number): Promise<IAgendamento[]> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM agendamento WHERE profissional_id = $1 ORDER BY data, hora`,
        [profissional_id]
      );

      return result.rows;
    } finally {
      client.release();
    }
  },

  getAgendamentosByPaciente: async (paciente_id: number): Promise<IAgendamento[]> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM agendamento WHERE paciente_id = $1 ORDER BY data, hora`,
        [paciente_id]
      );

      return result.rows;
    } finally {
      client.release();
    }
  },

  getAgendamentosByData: async (data: string): Promise<IAgendamento[]> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM agendamento WHERE DATE(data) = $1 ORDER BY hora`,
        [data]
      );

      return result.rows;
    } finally {
      client.release();
    }
  },

  getAgendamentosByStatus: async (status: string): Promise<IAgendamento[]> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT * FROM agendamento WHERE status = $1 ORDER BY data, hora`,
        [status]
      );

      return result.rows;
    } finally {
      client.release();
    }
  },

  updateAgendamentoStatus: async (id: number, status: string): Promise<IAgendamento | undefined> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `UPDATE agendamento SET status = $1 WHERE id_agendamento = $2 RETURNING *`,
        [status, id]
      );

      return result.rows.length > 0 ? result.rows[0] : undefined;
    } finally {
      client.release();
    }
  },

  updateAgendamentoDataHora: async (id: number, data: Date, hora: string): Promise<IAgendamento | undefined> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `UPDATE agendamento SET data = $1, hora = $2 WHERE id_agendamento = $3 RETURNING *`,
        [data, hora, id]
      );

      return result.rows.length > 0 ? result.rows[0] : undefined;
    } finally {
      client.release();
    }
  }
};

export default agendamentoService;

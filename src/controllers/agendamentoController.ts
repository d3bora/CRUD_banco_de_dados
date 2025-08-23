import { Request, Response } from "express";
import AgendamentoService from "../services/agendamentoService";
import ProfissionalService from "../services/profissionalService";
import VitimaService from "../services/vitimaService";

const agendamentoService = new AgendamentoService();
const profissionalService = new ProfissionalService();
const vitimaService = new VitimaService();

export interface IAgendamento {
  _id?: string;
  data: Date;
  hora: string;
  profissional_id: string;
  paciente_id: string;
  status: string;
}

const agendamentoController = {
  createAgendamento: async (req: Request, res: Response) => {
    try {
      const { 
        data,
        hora,
        profissional_id,
        paciente_id,
        status
      } = req.body;

      // Validações básicas
      if (!data || !hora || !profissional_id || !paciente_id || !status) {
        return res.status(400).json({ 
          message: "Campos obrigatórios: data, hora, profissional_id, paciente_id, status" 
        });
      }

      // Validar formato da data
      const dataAgendamento = new Date(data);
      if (isNaN(dataAgendamento.getTime())) {
        return res.status(400).json({ 
          message: "Formato de data inválido" 
        });
      }

      // Validar se a data não é no passado
      if (dataAgendamento < new Date()) {
        return res.status(400).json({ 
          message: "Não é possível agendar para datas passadas" 
        });
      }

      // Validar formato da hora (HH:MM)
      if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(hora)) {
        return res.status(400).json({ 
          message: "Formato de hora inválido. Use HH:MM" 
        });
      }

      // Validar status
      const statusValidos = ['agendado', 'confirmado', 'cancelado', 'finalizado', 'remarcado'];
      if (!statusValidos.includes(status)) {
        return res.status(400).json({ 
          message: `Status inválido. Status válidos: ${statusValidos.join(', ')}` 
        });
      }

      // Verificar se o profissional existe
      const profissional = await profissionalService.listProfissionalById(profissional_id);
      if (!profissional) {
        return res.status(404).json({ 
          message: "Profissional não encontrado",
          profissional_id: profissional_id 
        });
      }

      // Verificar se o paciente existe
      const paciente = await vitimaService.listVitimaById(paciente_id);
      if (!paciente) {
        return res.status(404).json({ 
          message: "Paciente não encontrado",
          paciente_id: paciente_id 
        });
      }

      // Dados do agendamento
      const agendamentoData: IAgendamento = {
        data: dataAgendamento,
        hora,
        profissional_id,
        paciente_id,
        status
      };

      const createdAgendamento = await agendamentoService.createAgendamento(agendamentoData);

      return res.status(201).json({ 
        message: "Agendamento criado com sucesso",
        agendamento: createdAgendamento 
      });
    } catch (error: any) {
      console.error('Erro ao criar agendamento:', error);
      return res.status(400).json({ 
        message: error.message || "Erro interno ao criar agendamento"
      });
    }
  },

  listAgendamentoById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ message: "ID do agendamento é obrigatório" });
      }

      const agendamento: IAgendamento | undefined = await agendamentoService.listAgendamentoById(id);
      
      if (!agendamento) {
        return res.status(404).json({ message: "Agendamento não encontrado" });
      }
      
      return res.status(200).json({
        message: "Agendamento encontrado com sucesso",
        agendamento
      });
    } catch (error: any) {
      console.error('Erro ao buscar agendamento:', error);
      return res.status(400).json({ 
        message: error.message || "Erro interno ao buscar agendamento"
      });
    }
  },

  updateAgendamento: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { 
        data,
        hora,
        profissional_id,
        paciente_id,
        status
      } = req.body;

      if (!id) {
        return res.status(400).json({ message: "ID do agendamento é obrigatório" });
      }

      // Validar formato da data se fornecida
      let dataAgendamento: Date | undefined;
      if (data) {
        dataAgendamento = new Date(data);
        if (isNaN(dataAgendamento.getTime())) {
          return res.status(400).json({ 
            message: "Formato de data inválido" 
          });
        }
        if (dataAgendamento < new Date()) {
          return res.status(400).json({ 
            message: "Não é possível agendar para datas passadas" 
          });
        }
      }

      // Validar formato da hora se fornecida
      if (hora && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(hora)) {
        return res.status(400).json({ 
          message: "Formato de hora inválido. Use HH:MM" 
        });
      }

      // Validar status se fornecido
      if (status) {
        const statusValidos = ['agendado', 'confirmado', 'cancelado', 'finalizado', 'remarcado'];
        if (!statusValidos.includes(status)) {
          return res.status(400).json({ 
            message: `Status inválido. Status válidos: ${statusValidos.join(', ')}` 
          });
        }
      }

      // Verificar se o profissional existe se fornecido
      if (profissional_id) {
        const profissional = await profissionalService.listProfissionalById(profissional_id);
        if (!profissional) {
          return res.status(404).json({ 
            message: "Profissional não encontrado",
            profissional_id: profissional_id 
          });
        }
      }

      // Verificar se o paciente existe se fornecido
      if (paciente_id) {
        const paciente = await vitimaService.listVitimaById(paciente_id);
        if (!paciente) {
          return res.status(404).json({ 
            message: "Paciente não encontrado",
            paciente_id: paciente_id 
          });
        }
      }

      const updatedAgendamento = await agendamentoService.updateAgendamento(
        id,
        {
          data: dataAgendamento,
          hora,
          profissional_id,
          paciente_id,
          status
        }
      );
      
      if (!updatedAgendamento) {
        return res.status(404).json({ message: "Agendamento não encontrado" });
      }
      
      return res.status(200).json({
        message: "Agendamento atualizado com sucesso",
        agendamento: updatedAgendamento
      });
    } catch (error: any) {
      console.error('Erro ao atualizar agendamento:', error);
      return res.status(400).json({ 
        message: error.message || "Erro interno ao atualizar agendamento"
      });
    }
  },

  deleteAgendamento: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ message: "ID do agendamento é obrigatório" });
      }

      const deleted = await agendamentoService.deleteAgendamento(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Agendamento não encontrado" });
      }
      
      return res.status(200).json({ message: "Agendamento excluído com sucesso" });
    } catch (error: any) {
      console.error('Erro ao excluir agendamento:', error);
      return res.status(400).json({ 
        message: error.message || "Erro interno ao excluir agendamento"
      });
    }
  },

  listAllAgendamentos: async (req: Request, res: Response) => {
    try {
      const agendamentos: IAgendamento[] = await agendamentoService.listAllAgendamentos();

      return res.status(200).json({
        message: "Agendamentos listados com sucesso",
        agendamentos,
        total: agendamentos.length
      });
    } catch (error: any) {
      console.error('Erro ao listar agendamentos:', error);
      return res.status(400).json({ 
        message: error.message || "Erro interno ao listar agendamentos"
      });
    }
  }
};

export default agendamentoController;

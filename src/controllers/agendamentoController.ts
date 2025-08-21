import { Request, Response } from "express";
import agendamentoService from "../services/agendamentoService";
import profissionalService from "../services/profissionalService";
import vitimaService from "../services/vitimaService";

export interface IAgendamento {
  // Campos da tabela agendamento
  id_agendamento: number;
  data: Date | null;
  hora: string | null;
  profissional_id: number | null;
  paciente_id: number | null;
  status: string | null;
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

      // Verificar se o profissional existe
      if (profissional_id) {
        const profissional = await profissionalService.listProfissionalById(profissional_id);
        if (!profissional) {
          return res.status(404).json({ 
            message: "Profissional não encontrado",
            profissional_id: profissional_id 
          });
        }
      }

      // Verificar se o paciente existe
      if (paciente_id) {
        const paciente = await vitimaService.listVitimaById(paciente_id);
        if (!paciente) {
          return res.status(404).json({ 
            message: "Paciente não encontrado",
            paciente_id: paciente_id 
          });
        }
      }

      const createdAgendamento = await agendamentoService.createAgendamento(
        data,
        hora,
        profissional_id,
        paciente_id,
        status
      );

      return res.status(201).json({ 
        message: "Agendamento criado com sucesso",
        agendamento: createdAgendamento 
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listAgendamentoById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const agendamento: IAgendamento | undefined = await agendamentoService.listAgendamentoById(id);
      
      if (!agendamento) {
        return res.status(404).json({ message: "Agendamento não encontrado" });
      }
      
      return res.status(200).json(agendamento);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateAgendamento: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { 
        data,
        hora,
        profissional_id,
        paciente_id,
        status
      } = req.body;

      // Verificar se o profissional existe
      if (profissional_id) {
        const profissional = await profissionalService.listProfissionalById(profissional_id);
        if (!profissional) {
          return res.status(404).json({ 
            message: "Profissional não encontrado",
            profissional_id: profissional_id 
          });
        }
      }

      // Verificar se o paciente existe
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
        data,
        hora,
        profissional_id,
        paciente_id,
        status
      );
      
      if (!updatedAgendamento) {
        return res.status(404).json({ message: "Agendamento não encontrado" });
      }
      
      return res.status(200).json({
        message: "Agendamento atualizado com sucesso",
        agendamento: updatedAgendamento
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  deleteAgendamento: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const deleted = await agendamentoService.deleteAgendamento(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Agendamento não encontrado" });
      }
      
      return res.status(200).json({ message: "Agendamento excluído com sucesso" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listAllAgendamentos: async (req: Request, res: Response) => {
    try {
      const agendamentos: IAgendamento[] = await agendamentoService.listAllAgendamentos();
      return res.status(200).json(agendamentos);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  // Métodos específicos para agendamentos
  getAgendamentosByProfissional: async (req: Request, res: Response) => {
    try {
      const { profissional_id } = req.params;

      const agendamentos: IAgendamento[] = await agendamentoService.getAgendamentosByProfissional(parseInt(profissional_id));
      return res.status(200).json(agendamentos);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  getAgendamentosByPaciente: async (req: Request, res: Response) => {
    try {
      const { paciente_id } = req.params;

      const agendamentos: IAgendamento[] = await agendamentoService.getAgendamentosByPaciente(parseInt(paciente_id));
      return res.status(200).json(agendamentos);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  getAgendamentosByData: async (req: Request, res: Response) => {
    try {
      const { data } = req.params;

      const agendamentos: IAgendamento[] = await agendamentoService.getAgendamentosByData(data);
      return res.status(200).json(agendamentos);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  getAgendamentosByStatus: async (req: Request, res: Response) => {
    try {
      const { status } = req.params;

      const agendamentos: IAgendamento[] = await agendamentoService.getAgendamentosByStatus(status);
      return res.status(200).json(agendamentos);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateAgendamentoStatus: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;

      const updatedAgendamento = await agendamentoService.updateAgendamentoStatus(id, status);
      
      if (!updatedAgendamento) {
        return res.status(404).json({ message: "Agendamento não encontrado" });
      }
      
      return res.status(200).json({
        message: "Status do agendamento atualizado com sucesso",
        agendamento: updatedAgendamento
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateAgendamentoDataHora: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { data, hora } = req.body;

      const updatedAgendamento = await agendamentoService.updateAgendamentoDataHora(id, data, hora);
      
      if (!updatedAgendamento) {
        return res.status(404).json({ message: "Agendamento não encontrado" });
      }
      
      return res.status(200).json({
        message: "Data e hora do agendamento atualizados com sucesso",
        agendamento: updatedAgendamento
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export default agendamentoController;

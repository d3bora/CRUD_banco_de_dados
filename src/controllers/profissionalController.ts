import { Request, Response } from "express";
import profissionalService from "../services/profissionalService";

export interface IProfissional {
  // Campos da tabela profissionalsaude
  id_profissional: number;
  numero_registro: string | null;
  cargo: string | null;
  especialidade: string | null;
  
  // Campos da tabela usuario (herdados)
  id_usuario: number;
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

const profissionalController = {
  createProfissional: async (req: Request, res: Response) => {
    try {
      const { 
        // Dados do usuário
        cpf,
        telefone,
        senha,
        login,
        email,
        nome,
        sobrenome,
        data_cadastro,
        // Dados do profissional
        numero_registro,
        cargo,
        especialidade
      } = req.body;

      // Dados do usuário
      const usuarioData = {
        cpf,
        telefone,
        senha,
        login,
        email,
        tipo_usuario: 'profissional' as const,
        nome,
        sobrenome,
        data_cadastro: data_cadastro || new Date()
      };

      // Dados do profissional
      const profissionalData = {
        numero_registro,
        cargo,
        especialidade
      };

      const createdProfissional = await profissionalService.createProfissional(usuarioData, profissionalData);

      return res.status(201).json({ 
        message: "Usuário e profissional criados com sucesso",
        profissional: createdProfissional 
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listProfissionalById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const profissional: IProfissional | undefined = await profissionalService.listProfissionalById(id);
      
      if (!profissional) {
        return res.status(404).json({ message: "Profissional não encontrado" });
      }
      
      return res.status(200).json(profissional);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateProfissional: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { 
        numero_registro,
        cargo,
        especialidade
      } = req.body;

      const updatedProfissional = await profissionalService.updateProfissional(
        id,
        numero_registro,
        cargo,
        especialidade
      );
      
      if (!updatedProfissional) {
        return res.status(404).json({ message: "Profissional não encontrado" });
      }
      
      return res.status(200).json({
        message: "Profissional atualizado com sucesso",
        profissional: updatedProfissional
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  deleteProfissional: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const deleted = await profissionalService.deleteProfissional(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Profissional não encontrado" });
      }
      
      return res.status(200).json({ message: "Profissional excluído com sucesso" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listAllProfissionais: async (req: Request, res: Response) => {
    try {
      const profissionais: IProfissional[] = await profissionalService.listAllProfissionais();
      return res.status(200).json(profissionais);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  // Métodos específicos para profissionais
  getProfissionaisByEspecialidade: async (req: Request, res: Response) => {
    try {
      const { especialidade } = req.params;

      const profissionais: IProfissional[] = await profissionalService.getProfissionaisByEspecialidade(especialidade);
      return res.status(200).json(profissionais);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  getProfissionaisByCargo: async (req: Request, res: Response) => {
    try {
      const { cargo } = req.params;

      const profissionais: IProfissional[] = await profissionalService.getProfissionaisByCargo(cargo);
      return res.status(200).json(profissionais);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateProfissionalEspecialidade: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { especialidade } = req.body;

      const updatedProfissional = await profissionalService.updateProfissionalEspecialidade(id, especialidade);
      
      if (!updatedProfissional) {
        return res.status(404).json({ message: "Profissional não encontrado" });
      }
      
      return res.status(200).json({
        message: "Especialidade do profissional atualizada com sucesso",
        profissional: updatedProfissional
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateProfissionalCargo: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { cargo } = req.body;

      const updatedProfissional = await profissionalService.updateProfissionalCargo(id, cargo);
      
      if (!updatedProfissional) {
        return res.status(404).json({ message: "Profissional não encontrado" });
      }
      
      return res.status(200).json({
        message: "Cargo do profissional atualizado com sucesso",
        profissional: updatedProfissional
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export default profissionalController;

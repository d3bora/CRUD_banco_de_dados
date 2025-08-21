import { Request, Response } from "express";
import vitimaService from "../services/vitimaService";

export interface IVitima {
  // Campos da tabela vitima
  id_vitima: number;
  endereco: string | null;
  data_nascimento: Date | null;
  idade: number | null;
  escolaridade: string | null;
  etnia: string | null;
}

const vitimaController = {
  createVitima: async (req: Request, res: Response) => {
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
        // Dados da vítima
        endereco,
        data_nascimento,
        idade,
        escolaridade,
        etnia
      } = req.body;

      // Dados do usuário
      const usuarioData = {
        cpf,
        telefone,
        senha,
        login,
        email,
        tipo_usuario: 'vítima' as const,
        nome,
        sobrenome,
        data_cadastro: data_cadastro || new Date()
      };

      // Dados da vítima
      const vitimaData = {
        endereco,
        data_nascimento,
        idade,
        escolaridade,
        etnia
      };

      const createdVitima = await vitimaService.createVitima(usuarioData, vitimaData);

      return res.status(201).json({ 
        message: "Usuário e vítima criados com sucesso",
        vitima: createdVitima 
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listVitimaById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const vitima: IVitima | undefined = await vitimaService.listVitimaById(id);
      
      if (!vitima) {
        return res.status(404).json({ message: "Vítima não encontrada" });
      }
      
      return res.status(200).json(vitima);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateVitima: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { 
        endereco,
        data_nascimento,
        idade,
        escolaridade,
        etnia
      } = req.body;

      const updatedVitima = await vitimaService.updateVitima(
        id,
        endereco,
        data_nascimento,
        idade,
        escolaridade,
        etnia
      );
      
      if (!updatedVitima) {
        return res.status(404).json({ message: "Vítima não encontrada" });
      }
      
      return res.status(200).json({
        message: "Vítima atualizada com sucesso",
        vitima: updatedVitima
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  deleteVitima: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const deleted = await vitimaService.deleteVitima(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Vítima não encontrada" });
      }
      
      return res.status(200).json({ message: "Vítima excluída com sucesso" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listAllVitimas: async (req: Request, res: Response) => {
    try {
      const vitimas: IVitima[] = await vitimaService.listAllVitimas();
      return res.status(200).json(vitimas);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  // Métodos específicos para vítimas
  getVitimasByEscolaridade: async (req: Request, res: Response) => {
    try {
      const { escolaridade } = req.params;

      const vitimas: IVitima[] = await vitimaService.getVitimaByEscolaridade(escolaridade);
      return res.status(200).json(vitimas);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  getVitimasByEtnia: async (req: Request, res: Response) => {
    try {
      const { etnia } = req.params;

      const vitimas: IVitima[] = await vitimaService.getVitimaByEtnia(etnia);
      return res.status(200).json(vitimas);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateVitimaEndereco: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { endereco } = req.body;

      const updatedVitima = await vitimaService.updateVitimaEndereco(id, endereco);
      
      if (!updatedVitima) {
        return res.status(404).json({ message: "Vítima não encontrada" });
      }
      
      return res.status(200).json({
        message: "Endereço da vítima atualizado com sucesso",
        vitima: updatedVitima
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateVitimaEscolaridade: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { escolaridade } = req.body;

      const updatedVitima = await vitimaService.updateVitimaEscolaridade(id, escolaridade);
      
      if (!updatedVitima) {
        return res.status(404).json({ message: "Vítima não encontrada" });
      }
      
      return res.status(200).json({
        message: "Escolaridade da vítima atualizada com sucesso",
        vitima: updatedVitima
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export default vitimaController;

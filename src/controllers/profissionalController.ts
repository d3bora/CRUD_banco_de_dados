import { Request, Response } from "express";
import ProfissionalService from "../services/profissionalService";
import VitimaService from "../services/vitimaService";

const profissionalService = new ProfissionalService();
const vitimaService = new VitimaService();

export interface IProfissional {
  _id?: string;
  numero_registro?: string;
  cargo?: string;
  especialidade?: string;
}

export interface IProfissionalCreate {
  _id?: string;
  cpf: string;
  telefone?: string;
  senha: string;
  login: string;
  email?: string;
  tipo_usuario: 'profissional';
  nome: string;
  sobrenome: string;
  data_cadastro: Date;
  numero_registro: string;
  cargo: string;
  especialidade: string;
  ativo?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

const profissionalController = {
  createProfissional: async (req: Request, res: Response) => {
    try {
      const { 
        cpf,
        telefone,
        senha,
        login,
        email,
        nome,
        sobrenome,
        numero_registro,
        cargo,
        especialidade
      } = req.body;

      // Validações básicas
      if (!cpf || !senha || !login || !nome || !sobrenome || !numero_registro || !cargo || !especialidade) {
        return res.status(400).json({ 
          message: "Campos obrigatórios: cpf, senha, login, nome, sobrenome, numero_registro, cargo, especialidade" 
        });
      }

      // Validar formato do CPF (11 dígitos)
      if (!/^\d{11}$/.test(cpf)) {
        return res.status(400).json({ 
          message: "CPF deve conter exatamente 11 dígitos numéricos" 
        });
      }

      // Validar formato do telefone (+55XXXXXXXXXXX)
      if (telefone && !/^\+55\d{10,11}$/.test(telefone)) {
        return res.status(400).json({ 
          message: "Telefone deve ter formato +55XXXXXXXXXXX" 
        });
      }

      // Validar formato do email
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ 
          message: "Formato de email inválido" 
        });
      }

      // Dados do usuário profissional
      const profissionalData: IProfissionalCreate = {
        cpf,
        telefone,
        senha,
        login,
        email,
        tipo_usuario: 'profissional',
        nome,
        sobrenome,
        numero_registro,
        cargo,
        especialidade,
        data_cadastro: new Date(),
        ativo: true,
        created_at: new Date(),
        updated_at: new Date()
      };

      const createdProfissional = await profissionalService.createProfissional(profissionalData);

      return res.status(201).json({ 
        message: "Profissional criado com sucesso",
        profissional: createdProfissional 
      });
    } catch (error: any) {
      console.error('Erro ao criar profissional:', error);
      return res.status(400).json({ 
        message: error.message || "Erro interno ao criar profissional"
      });
    }
  },

  listProfissionalById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ message: "ID do profissional é obrigatório" });
      }

      const profissional: IProfissional | undefined = await profissionalService.listProfissionalById(id);
      
      if (!profissional) {
        return res.status(404).json({ message: "Profissional não encontrado" });
      }
      
      return res.status(200).json({
        message: "Profissional encontrado com sucesso",
        profissional
      });
    } catch (error: any) {
      console.error('Erro ao buscar profissional:', error);
      return res.status(400).json({ 
        message: error.message || "Erro interno ao buscar profissional"
      });
    }
  },

  updateProfissional: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { 
        telefone,
        email,
        nome,
        sobrenome,
        numero_registro,
        cargo,
        especialidade
      } = req.body;

      if (!id) {
        return res.status(400).json({ message: "ID do profissional é obrigatório" });
      }

      const updatedProfissional = await profissionalService.updateProfissional(
        id,
        {
          telefone,
          email,
          nome,
          sobrenome,
          numero_registro,
          cargo,
          especialidade
        }
      );
      
      if (!updatedProfissional) {
        return res.status(404).json({ message: "Profissional não encontrado" });
      }
      
      return res.status(200).json({
        message: "Profissional atualizado com sucesso",
        profissional: updatedProfissional
      });
    } catch (error: any) {
      console.error('Erro ao atualizar profissional:', error);
      return res.status(400).json({ 
        message: error.message || "Erro interno ao atualizar profissional"
      });
    }
  },

  deleteProfissional: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ message: "ID do profissional é obrigatório" });
      }

      const deleted = await profissionalService.deleteProfissional(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Profissional não encontrado" });
      }
      
      return res.status(200).json({ message: "Profissional excluído com sucesso" });
    } catch (error: any) {
      console.error('Erro ao excluir profissional:', error);
      return res.status(400).json({ 
        message: error.message || "Erro interno ao excluir profissional"
      });
    }
  },

  listAllProfissionais: async (req: Request, res: Response) => {
    try {
      const profissionais: IProfissional[] = await profissionalService.listAllProfissionais();

      return res.status(200).json({
        message: "Profissionais listados com sucesso",
        profissionais,
        total: profissionais.length
      });
    } catch (error: any) {
      console.error('Erro ao listar profissionais:', error);
      return res.status(400).json({ 
        message: error.message || "Erro interno ao listar profissionais"
      });
    }
  }
};

export default profissionalController;

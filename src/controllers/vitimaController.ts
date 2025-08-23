import { Request, Response } from "express";
import VitimaService from "../services/vitimaService";

const vitimaService = new VitimaService();

export interface IVitima {
  _id?: string;
  cpf: string;
  telefone?: string;
  senha: string;
  login: string;
  email?: string;
  tipo_usuario: 'vítima';
  nome: string;
  sobrenome: string;
  data_cadastro: Date;
  endereco: string;
  data_nascimento: Date;
  idade: number;
  escolaridade: string;
  etnia: string;
  ativo?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

const vitimaController = {
  createVitima: async (req: Request, res: Response) => {
    try {
      const { 
        cpf,
        telefone,
        senha,
        login,
        email,
        nome,
        sobrenome,
        endereco,
        data_nascimento,
        idade,
        escolaridade,
        etnia
      } = req.body;

      // Validações básicas
      if (!cpf || !senha || !login || !nome || !sobrenome) {
        return res.status(400).json({ 
          message: "Campos obrigatórios: cpf, senha, login, nome, sobrenome" 
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

      // Validar idade se fornecida
      if (idade && (idade < 0 || idade > 150)) {
        return res.status(400).json({ 
          message: "Idade deve estar entre 0 e 150 anos" 
        });
      }

      // Validar endereço
      if (!endereco) {
        return res.status(400).json({ 
          message: "Endereço é obrigatório" 
        });
      }

      // Dados do usuário com dados da vítima embutidos
      const vitimaData: IVitima = {
        cpf,
        telefone,
        senha,
        login,
        email,
        tipo_usuario: 'vítima',
        nome,
        sobrenome,
        data_cadastro: new Date(),
        endereco: endereco || '',
        data_nascimento: data_nascimento ? new Date(data_nascimento) : new Date(),
        idade: idade || 0,
        escolaridade: escolaridade || '',
        etnia: etnia || '',
        ativo: true,
        created_at: new Date(),
        updated_at: new Date()
      };

      const createdVitima = await vitimaService.createVitima(vitimaData);

      return res.status(201).json({ 
        message: "Vítima criada com sucesso",
        vitima: createdVitima 
      });
    } catch (error: any) {
      console.error('Erro ao criar vítima:', error);
      return res.status(400).json({ 
        message: error.message || "Erro interno ao criar vítima"
      });
    }
  },

  listVitimaById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ message: "ID da vítima é obrigatório" });
      }

      const vitima: IVitima | undefined = await vitimaService.listVitimaById(id);
      
      if (!vitima) {
        return res.status(404).json({ message: "Vítima não encontrada" });
      }
      
      return res.status(200).json({
        message: "Vítima encontrada com sucesso",
        vitima
      });
    } catch (error: any) {
      console.error('Erro ao buscar vítima:', error);
      return res.status(400).json({ 
        message: error.message || "Erro interno ao buscar vítima"
      });
    }
  },

  updateVitima: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { 
        telefone,
        email,
        nome,
        sobrenome,
        endereco,
        data_nascimento,
        idade,
        escolaridade,
        etnia
      } = req.body;

      if (!id) {
        return res.status(400).json({ message: "ID da vítima é obrigatório" });
      }

      // Validar idade se fornecida
      if (idade && (idade < 0 || idade > 150)) {
        return res.status(400).json({ 
          message: "Idade deve estar entre 0 e 150 anos" 
        });
      }

      const updatedVitima = await vitimaService.updateVitima(
        id,
        {
          telefone,
          email,
          nome,
          sobrenome,
          endereco,
          data_nascimento: data_nascimento ? new Date(data_nascimento) : undefined,
          idade,
          escolaridade,
          etnia
        }
      );
      
      if (!updatedVitima) {
        return res.status(404).json({ message: "Vítima não encontrada" });
      }
      
      return res.status(200).json({
        message: "Vítima atualizada com sucesso",
        vitima: updatedVitima
      });
    } catch (error: any) {
      console.error('Erro ao atualizar vítima:', error);
      return res.status(400).json({ 
        message: error.message || "Erro interno ao atualizar vítima"
      });
    }
  },

  deleteVitima: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ message: "ID da vítima é obrigatório" });
      }

      const deleted = await vitimaService.deleteVitima(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Vítima não encontrada" });
      }
      
      return res.status(200).json({ message: "Vítima excluída com sucesso" });
    } catch (error: any) {
      console.error('Erro ao excluir vítima:', error);
      return res.status(400).json({ 
        message: error.message || "Erro interno ao excluir vítima"
      });
    }
  },

  listAllVitimas: async (req: Request, res: Response) => {
    try {
      const vitimas: IVitima[] = await vitimaService.listAllVitimas();

      return res.status(200).json({
        message: "Vítimas listadas com sucesso",
        vitimas,
        total: vitimas.length
      });
    } catch (error: any) {
      console.error('Erro ao listar vítimas:', error);
      return res.status(400).json({ 
        message: error.message || "Erro interno ao listar vítimas"
      });
    }
  }
};

export default vitimaController;

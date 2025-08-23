import { Collection, ObjectId } from "mongodb";
import { getDb } from "../database";

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

export interface IVitimaUpdate {
  telefone?: string;
  email?: string;
  nome?: string;
  sobrenome?: string;
  endereco?: string;
  data_nascimento?: Date;
  idade?: number;
  escolaridade?: string;
  etnia?: string;
}

class VitimaService {
  private collection: Collection | null = null;

  private getCollection(): Collection {
    if (!this.collection) {
      this.collection = getDb().collection("usuarios");
    }
    return this.collection;
  }

  async createVitima(vitimaData: IVitima): Promise<IVitima> {
    try {
      // Verificar se CPF já existe
      const existingVitima = await this.getCollection().findOne({ cpf: vitimaData.cpf });
      if (existingVitima) {
        throw new Error("CPF já cadastrado no sistema");
      }

      // Verificar se login já existe
      const existingLogin = await this.getCollection().findOne({ login: vitimaData.login });
      if (existingLogin) {
        throw new Error("Login já cadastrado no sistema");
      }

      // Verificar se email já existe (se fornecido)
      if (vitimaData.email) {
        const existingEmail = await this.getCollection().findOne({ email: vitimaData.email });
        if (existingEmail) {
          throw new Error("Email já cadastrado no sistema");
        }
      }

      // 1. Criar usuário na coleção usuarios (dados básicos)
      const usuarioData = {
        cpf: vitimaData.cpf,
        telefone: vitimaData.telefone,
        senha: vitimaData.senha,
        login: vitimaData.login,
        email: vitimaData.email,
        tipo_usuario: vitimaData.tipo_usuario,
        nome: vitimaData.nome,
        sobrenome: vitimaData.sobrenome,
        data_cadastro: vitimaData.data_cadastro,
        ativo: vitimaData.ativo,
        created_at: vitimaData.created_at,
        updated_at: vitimaData.updated_at
      };

      const usuarioResult = await this.getCollection().insertOne(usuarioData);

      // 2. Criar documento na coleção vitimas (dados específicos)
      const vitimaCollection = getDb().collection("vitimas");
      const vitimaDoc = {
        usuario_id: usuarioResult.insertedId,
        endereco: vitimaData.endereco,
        data_nascimento: vitimaData.data_nascimento,
        idade: vitimaData.idade,
        escolaridade: vitimaData.escolaridade,
        etnia: vitimaData.etnia
      };

      await vitimaCollection.insertOne(vitimaDoc);

      // Retornar dados completos da vítima
      return { 
        ...vitimaData, 
        _id: usuarioResult.insertedId.toString() 
      };
    } catch (error) {
      throw error;
    }
  }

  async listVitimaById(id: string): Promise<IVitima | undefined> {
    try {
      // Buscar dados específicos da vítima na coleção vitimas
      const vitimaCollection = getDb().collection("vitimas");
      const vitimaData = await vitimaCollection.findOne({ usuario_id: new ObjectId(id) });
      
      if (!vitimaData) return undefined;

      // Retornar apenas os dados da vítima
      return {
        _id: vitimaData.usuario_id.toString(),
        endereco: vitimaData.endereco,
        data_nascimento: vitimaData.data_nascimento,
        idade: vitimaData.idade,
        escolaridade: vitimaData.escolaridade,
        etnia: vitimaData.etnia
      } as IVitima;
    } catch (error) {
      throw error;
    }
  }

  async updateVitima(id: string, updateData: IVitimaUpdate): Promise<IVitima | undefined> {
    try {
      const updateFields: any = { updated_at: new Date() };
      const vitimaUpdateFields: any = {};

      // Atualizar campos básicos do usuário
      if (updateData.telefone !== undefined) updateFields.telefone = updateData.telefone;
      if (updateData.email !== undefined) updateFields.email = updateData.email;
      if (updateData.nome !== undefined) updateFields.nome = updateData.nome;
      if (updateData.sobrenome !== undefined) updateFields.sobrenome = updateData.sobrenome;

      // Atualizar dados específicos da vítima
      if (updateData.endereco !== undefined) vitimaUpdateFields.endereco = updateData.endereco;
      if (updateData.data_nascimento !== undefined) vitimaUpdateFields.data_nascimento = updateData.data_nascimento;
      if (updateData.idade !== undefined) vitimaUpdateFields.idade = updateData.idade;
      if (updateData.escolaridade !== undefined) vitimaUpdateFields.escolaridade = updateData.escolaridade;
      if (updateData.etnia !== undefined) vitimaUpdateFields.etnia = updateData.etnia;

      // 1. Atualizar usuário na coleção usuarios
      if (Object.keys(updateFields).length > 1) { // > 1 porque sempre tem updated_at
        await this.getCollection().updateOne(
          { _id: new ObjectId(id), tipo_usuario: "vítima" },
          { $set: updateFields }
        );
      }

      // 2. Atualizar dados da vítima na coleção vitimas
      if (Object.keys(vitimaUpdateFields).length > 0) {
        const vitimaCollection = getDb().collection("vitimas");
        await vitimaCollection.updateOne(
          { usuario_id: new ObjectId(id) },
          { $set: vitimaUpdateFields }
        );
      }

      // Retornar vítima atualizada
      return await this.listVitimaById(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteVitima(id: string): Promise<boolean> {
    try {
      // 1. Deletar dados da vítima na coleção vitimas
      const vitimaCollection = getDb().collection("vitimas");
      await vitimaCollection.deleteOne({ usuario_id: new ObjectId(id) });

      // 2. Deletar usuário na coleção usuarios
      const result = await this.getCollection().deleteOne({ 
        _id: new ObjectId(id), 
        tipo_usuario: "vítima" 
      });
      
      return result.deletedCount > 0;
    } catch (error) {
      throw error;
    }
  }

  async listAllVitimas(): Promise<IVitima[]> {
    try {
      // Buscar dados específicos de todas as vítimas na coleção vitimas
      const vitimaCollection = getDb().collection("vitimas");
      const vitimasData = await vitimaCollection.find({}).toArray();

      // Retornar apenas os dados das vítimas
      return vitimasData.map(vitima => ({
        _id: vitima.usuario_id.toString(),
        endereco: vitima.endereco,
        data_nascimento: vitima.data_nascimento,
        idade: vitima.idade,
        escolaridade: vitima.escolaridade,
        etnia: vitima.etnia
      })) as IVitima[];
    } catch (error) {
      throw error;
    }
  }
}

export default VitimaService;

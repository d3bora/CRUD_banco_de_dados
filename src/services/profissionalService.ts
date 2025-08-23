import { Collection, ObjectId } from "mongodb";
import { getDb } from "../database";

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

export interface IProfissionalUpdate {
  telefone?: string;
  email?: string;
  nome?: string;
  sobrenome?: string;
  numero_registro?: string;
  cargo?: string;
  especialidade?: string;
}

class ProfissionalService {
  private collection: Collection | null = null;

  private getCollection(): Collection {
    if (!this.collection) {
      this.collection = getDb().collection("usuarios");
    }
    return this.collection;
  }

  async createProfissional(profissionalData: IProfissionalCreate): Promise<IProfissional> {
    try {
      // Verificar se CPF já existe
      const existingProfissional = await this.getCollection().findOne({ cpf: profissionalData.cpf });
      if (existingProfissional) {
        throw new Error("CPF já cadastrado no sistema");
      }

      // Verificar se login já existe
      const existingLogin = await this.getCollection().findOne({ login: profissionalData.login });
      if (existingLogin) {
        throw new Error("Login já cadastrado no sistema");
      }

      // Verificar se email já existe (se fornecido)
      if (profissionalData.email) {
        const existingEmail = await this.getCollection().findOne({ email: profissionalData.email });
        if (existingEmail) {
          throw new Error("Email já cadastrado no sistema");
        }
      }

      // 1. Criar usuário na coleção usuarios (dados básicos)
      const usuarioData = {
        cpf: profissionalData.cpf,
        telefone: profissionalData.telefone,
        senha: profissionalData.senha,
        login: profissionalData.login,
        email: profissionalData.email,
        tipo_usuario: profissionalData.tipo_usuario,
        nome: profissionalData.nome,
        sobrenome: profissionalData.sobrenome,
        data_cadastro: profissionalData.data_cadastro,
        ativo: profissionalData.ativo,
        created_at: profissionalData.created_at,
        updated_at: profissionalData.updated_at
      };

      const usuarioResult = await this.getCollection().insertOne(usuarioData);

      // 2. Criar documento na coleção profissionais_saude (dados específicos)
      const profissionalCollection = getDb().collection("profissionais_saude");
      const profissionalDoc = {
        usuario_id: usuarioResult.insertedId,
        numero_registro: profissionalData.numero_registro,
        cargo: profissionalData.cargo,
        especialidade: profissionalData.especialidade
      };

      await profissionalCollection.insertOne(profissionalDoc);

      // Retornar dados do profissional
      return { 
        _id: usuarioResult.insertedId.toString(),
        numero_registro: profissionalData.numero_registro,
        cargo: profissionalData.cargo,
        especialidade: profissionalData.especialidade
      };
    } catch (error) {
      throw error;
    }
  }

  async listProfissionalById(id: string): Promise<IProfissional | undefined> {
    try {
      // Buscar dados específicos do profissional na coleção profissionais_saude
      const profissionalCollection = getDb().collection("profissionais_saude");
      const profissionalData = await profissionalCollection.findOne({ usuario_id: new ObjectId(id) });
      
      if (!profissionalData) return undefined;

      // Retornar dados específicos do profissional
      return {
        _id: profissionalData.usuario_id.toString(),
        numero_registro: profissionalData.numero_registro,
        cargo: profissionalData.cargo,
        especialidade: profissionalData.especialidade
      } as IProfissional;
    } catch (error) {
      throw error;
    }
  }

  async updateProfissional(id: string, updateData: IProfissionalUpdate): Promise<IProfissional | undefined> {
    try {
      const updateFields: any = { updated_at: new Date() };
      const profissionalUpdateFields: any = {};

      // Atualizar campos básicos do usuário
      if (updateData.telefone !== undefined) updateFields.telefone = updateData.telefone;
      if (updateData.email !== undefined) updateFields.email = updateData.email;
      if (updateData.nome !== undefined) updateFields.nome = updateData.nome;
      if (updateData.sobrenome !== undefined) updateFields.sobrenome = updateData.sobrenome;

      // Atualizar campos específicos do profissional
      if (updateData.numero_registro !== undefined) profissionalUpdateFields.numero_registro = updateData.numero_registro;
      if (updateData.cargo !== undefined) profissionalUpdateFields.cargo = updateData.cargo;
      if (updateData.especialidade !== undefined) profissionalUpdateFields.especialidade = updateData.especialidade;

      // 1. Atualizar usuário na coleção usuarios
      if (Object.keys(updateFields).length > 1) { // > 1 porque sempre tem updated_at
        await this.getCollection().updateOne(
          { _id: new ObjectId(id), tipo_usuario: "profissional" },
          { $set: updateFields }
        );
      }

      // 2. Atualizar dados específicos do profissional na coleção profissionais_saude
      if (Object.keys(profissionalUpdateFields).length > 0) {
        const profissionalCollection = getDb().collection("profissionais_saude");
        await profissionalCollection.updateOne(
          { usuario_id: new ObjectId(id) },
          { $set: profissionalUpdateFields }
        );
      }

      // Retornar profissional atualizado
      return await this.listProfissionalById(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteProfissional(id: string): Promise<boolean> {
    try {
      // 1. Deletar dados do profissional na coleção profissionais_saude
      const profissionalCollection = getDb().collection("profissionais_saude");
      await profissionalCollection.deleteOne({ usuario_id: new ObjectId(id) });

      // 2. Deletar usuário na coleção usuarios
      const result = await this.getCollection().deleteOne({ 
        _id: new ObjectId(id), 
        tipo_usuario: "profissional" 
      });
      
      return result.deletedCount > 0;
    } catch (error) {
      throw error;
    }
  }

  async listAllProfissionais(): Promise<IProfissional[]> {
    try {
      // Buscar dados específicos de todos os profissionais na coleção profissionais_saude
      const profissionalCollection = getDb().collection("profissionais_saude");
      const profissionaisData = await profissionalCollection.find({}).toArray();

      // Retornar dados específicos dos profissionais
      return profissionaisData.map(profissional => ({
        _id: profissional.usuario_id.toString(),
        numero_registro: profissional.numero_registro,
        cargo: profissional.cargo,
        especialidade: profissional.especialidade
      })) as IProfissional[];
    } catch (error) {
      throw error;
    }
  }
}

export default ProfissionalService;


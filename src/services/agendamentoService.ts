import { Collection, ObjectId } from "mongodb";
import { getDb } from "../database";

export interface IAgendamento {
  _id?: string;
  data: Date;
  hora: string;
  profissional_id: string;
  paciente_id: string;
  status: string;
}

export interface IAgendamentoUpdate {
  data?: Date;
  hora?: string;
  profissional_id?: string;
  paciente_id?: string;
  status?: string;
}

interface IAgendamentoInsert {
  data: Date;
  hora: string;
  profissional_id: ObjectId;
  paciente_id: ObjectId;
  status: string;
}

class AgendamentoService {
  private collection: Collection | null = null;

  private getCollection(): Collection {
    if (!this.collection) {
      this.collection = getDb().collection("agendamentos");
    }
    return this.collection;
  }

  async createAgendamento(agendamentoData: IAgendamento): Promise<IAgendamento> {
    try {
      // Verificar se já existe agendamento no mesmo horário para o profissional
      const existingAgendamento = await this.getCollection().findOne({
        profissional_id: new ObjectId(agendamentoData.profissional_id),
        data: agendamentoData.data,
        hora: agendamentoData.hora,
        status: { $nin: ['cancelado', 'finalizado'] }
      });

      if (existingAgendamento) {
        throw new Error("Já existe um agendamento para este profissional neste horário");
      }

      // Verificar se já existe agendamento no mesmo horário para o paciente
      const existingPaciente = await this.getCollection().findOne({
        paciente_id: new ObjectId(agendamentoData.paciente_id),
        data: agendamentoData.data,
        hora: agendamentoData.hora,
        status: { $nin: ['cancelado', 'finalizado'] }
      });

      if (existingPaciente) {
        throw new Error("Já existe um agendamento para este paciente neste horário");
      }

      // Preparar dados para inserção
      const dataToInsert: IAgendamentoInsert = {
        data: agendamentoData.data,
        hora: agendamentoData.hora,
        profissional_id: new ObjectId(agendamentoData.profissional_id),
        paciente_id: new ObjectId(agendamentoData.paciente_id),
        status: agendamentoData.status,
      };
      
      const result = await this.getCollection().insertOne(dataToInsert);
      return { 
        _id: result.insertedId.toString(),
        data: agendamentoData.data,
        hora: agendamentoData.hora,
        profissional_id: agendamentoData.profissional_id,
        paciente_id: agendamentoData.paciente_id,
        status: agendamentoData.status
      };
    } catch (error) {
      throw error;
    }
  }

  async listAgendamentoById(id: string): Promise<IAgendamento | undefined> {
    try {
      const agendamento = await this.getCollection().findOne({ _id: new ObjectId(id) });
      
      if (!agendamento) return undefined;
      
      return {
        _id: agendamento._id.toString(),
        data: agendamento.data,
        hora: agendamento.hora,
        profissional_id: agendamento.profissional_id.toString(),
        paciente_id: agendamento.paciente_id.toString(),
        status: agendamento.status
      } as IAgendamento;
    } catch (error) {
      throw error;
    }
  }

  async updateAgendamento(id: string, updateData: IAgendamentoUpdate): Promise<IAgendamento | undefined> {
    try {
      const updateFields: any = {};

      // Atualizar campos básicos
      if (updateData.data !== undefined) updateFields.data = updateData.data;
      if (updateData.hora !== undefined) updateFields.hora = updateData.hora;
      if (updateData.status !== undefined) updateFields.status = updateData.status;

      // Atualizar IDs se fornecidos
      if (updateData.profissional_id !== undefined) {
        updateFields.profissional_id = new ObjectId(updateData.profissional_id);
      }
      if (updateData.paciente_id !== undefined) {
        updateFields.paciente_id = new ObjectId(updateData.paciente_id);
      }

      const result = await this.getCollection().findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateFields },
        { returnDocument: 'after' }
      );

      if (!result) return undefined;

      return {
        _id: result._id.toString(),
        data: result.data,
        hora: result.hora,
        profissional_id: result.profissional_id.toString(),
        paciente_id: result.paciente_id.toString(),
        status: result.status
      } as IAgendamento;
    } catch (error) {
      throw error;
    }
  }

  async deleteAgendamento(id: string): Promise<boolean> {
    try {
      const result = await this.getCollection().deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      throw error;
    }
  }

  async listAllAgendamentos(): Promise<IAgendamento[]> {
    try {
      const agendamentos = await this.getCollection()
        .find({})
        .sort({ data: 1, hora: 1 })
        .toArray();

      return agendamentos.map(agendamento => ({
        _id: agendamento._id.toString(),
        data: agendamento.data,
        hora: agendamento.hora,
        profissional_id: agendamento.profissional_id.toString(),
        paciente_id: agendamento.paciente_id.toString(),
        status: agendamento.status
      })) as IAgendamento[];
    } catch (error) {
      throw error;
    }
  }
}

export default AgendamentoService;

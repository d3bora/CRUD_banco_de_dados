import { Router } from "express";
import agendamentoController from "../controllers/agendamentoController";

const agendamentoRouter = Router();

// Rotas para agendamentos
agendamentoRouter.post("/", agendamentoController.createAgendamento);
agendamentoRouter.get("/", agendamentoController.listAllAgendamentos);
agendamentoRouter.get("/:id", agendamentoController.listAgendamentoById);
agendamentoRouter.put("/:id", agendamentoController.updateAgendamento);
agendamentoRouter.delete("/:id", agendamentoController.deleteAgendamento);

// Rotas específicas para agendamentos
agendamentoRouter.get("/profissional/:profissional_id", agendamentoController.getAgendamentosByProfissional);
agendamentoRouter.get("/paciente/:paciente_id", agendamentoController.getAgendamentosByPaciente);
agendamentoRouter.get("/data/:data", agendamentoController.getAgendamentosByData);
agendamentoRouter.get("/status/:status", agendamentoController.getAgendamentosByStatus);
agendamentoRouter.patch("/:id/status", agendamentoController.updateAgendamentoStatus);
agendamentoRouter.patch("/:id/datahora", agendamentoController.updateAgendamentoDataHora);

export default agendamentoRouter;


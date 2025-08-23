import { Router } from "express";
import agendamentoController from "../controllers/agendamentoController";

const agendamentoRouter = Router();

// Rotas para agendamentos
agendamentoRouter.post("/", agendamentoController.createAgendamento);
agendamentoRouter.get("/", agendamentoController.listAllAgendamentos);
agendamentoRouter.get("/:id", agendamentoController.listAgendamentoById);
agendamentoRouter.put("/:id", agendamentoController.updateAgendamento);
agendamentoRouter.delete("/:id", agendamentoController.deleteAgendamento);

export default agendamentoRouter;


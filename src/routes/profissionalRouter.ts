import { Router } from "express";
import profissionalController from "../controllers/profissionalController";

const profissionalRouter = Router();

// Rotas para profissionais
profissionalRouter.post("/", profissionalController.createProfissional);
profissionalRouter.get("/", profissionalController.listAllProfissionais);
profissionalRouter.get("/:id", profissionalController.listProfissionalById);
profissionalRouter.put("/:id", profissionalController.updateProfissional);
profissionalRouter.delete("/:id", profissionalController.deleteProfissional);

// Rotas específicas para profissionais
profissionalRouter.get("/especialidade/:escolaridade", profissionalController.getProfissionaisByEspecialidade);
profissionalRouter.get("/cargo/:cargo", profissionalController.getProfissionaisByCargo);
profissionalRouter.patch("/:id/especialidade", profissionalController.updateProfissionalEspecialidade);
profissionalRouter.patch("/:id/cargo", profissionalController.updateProfissionalCargo);

export default profissionalRouter;


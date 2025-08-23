import { Router } from "express";
import profissionalController from "../controllers/profissionalController";

const profissionalRouter = Router();

// Rotas para profissionais
profissionalRouter.post("/", profissionalController.createProfissional);
profissionalRouter.get("/", profissionalController.listAllProfissionais);
profissionalRouter.get("/:id", profissionalController.listProfissionalById);
profissionalRouter.put("/:id", profissionalController.updateProfissional);
profissionalRouter.delete("/:id", profissionalController.deleteProfissional);

export default profissionalRouter;


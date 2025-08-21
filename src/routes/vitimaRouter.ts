import { Router } from "express";
import vitimaController from "../controllers/vitimaController";

const vitimaRouter = Router();

// Rotas para vítimas
vitimaRouter.post("/", vitimaController.createVitima);
vitimaRouter.get("/", vitimaController.listAllVitimas);
vitimaRouter.get("/:id", vitimaController.listVitimaById);
vitimaRouter.put("/:id", vitimaController.updateVitima);
vitimaRouter.delete("/:id", vitimaController.deleteVitima);

export default vitimaRouter;

import express, { Express } from "express";
import vitimaRouter from "./vitimaRouter";
import profissionalRouter from "./profissionalRouter";
import agendamentoRouter from "./agendamentoRouter";

const router: Express = express();

router.use("/vitima", vitimaRouter);
router.use("/profissional", profissionalRouter);
router.use("/agendamento", agendamentoRouter);

export default router;

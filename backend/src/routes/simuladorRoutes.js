import { Router } from "express";
import { simuladorHealth } from "../controllers/simuladorController.js";

const router = Router();

// Proxy público de verificação de saúde para o simulador externo
router.get("/simulador/health", simuladorHealth);

export default router;

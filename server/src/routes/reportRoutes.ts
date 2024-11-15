import autoReportController from "../controllers/autoReportController";
import { Router } from "express";

const router = Router();

router.post("/generate-report", autoReportController.generateReport);

export default router;
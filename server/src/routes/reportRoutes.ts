import autoReportController from "../controllers/autoReportController";
import { Router } from "express";

const router = Router();

router.post("/generate-report", autoReportController.generateReport);
router.get("/list", autoReportController.getReports);
router.get("/:id",autoReportController.getReport)
export default router;
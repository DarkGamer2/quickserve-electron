import express from "express";
import JobController from "../controllers/jobController";

const router = express.Router();

router.get("/jobs", JobController.getJobs);
router.post("/addjob",JobController.createJob);
router.get('/:id',JobController.getJob)
router.put("/:id", JobController.updateJobStatus as express.RequestHandler)
export default router;
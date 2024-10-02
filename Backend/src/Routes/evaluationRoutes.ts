import { Router } from "express";
import {
  createEvaluation,
  listTeachersEvaluation,
} from "../Controllers/evaluationController";

const router = Router();

router.post("/create-evalution", createEvaluation);
router.get("/list-evaluations", listTeachersEvaluation);
export default router;

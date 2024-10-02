import { Router } from "express";
import {
  createEvaluation,
  listTeachersEvaluation,
  updateEvaluation,
} from "../Controllers/evaluationController";
import { authenticate, authorize } from "../helpers/authenticate";

const router = Router();

router.post(
  "/create-evalution",
  authenticate,
  authorize(["admin"]),
  createEvaluation
);
router.get(
  "/list-evaluations",
  authenticate,
  authorize(["admin"]),
  listTeachersEvaluation
);
router.put(
  "/update-evaluation",
  authenticate,
  authorize(["admin"]),
  updateEvaluation
);
export default router;

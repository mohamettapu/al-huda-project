import { Router } from "express";
import {
  allTeachers,
  CreateTeacher,
  UpdateTeacher,
} from "../Controllers/teacherController";
import { authenticate, authorize } from "../helpers/authenticate";
const router = Router();

router.post("/create", authenticate, authorize(["admin"]), CreateTeacher);
router.put("/update", authenticate, authorize(["admin"]), UpdateTeacher);
router.get("/list", authenticate, authorize(["admin"]), allTeachers);
export default router;

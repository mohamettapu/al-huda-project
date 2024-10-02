import { Router } from "express";
import {
  allTeachers,
  CreateTeacher,
  UpdateTeacher,
} from "../Controllers/teacherController";
const router = Router();

router.post("/create", CreateTeacher);
router.put("/update", UpdateTeacher);
router.get("/list", allTeachers);
export default router;

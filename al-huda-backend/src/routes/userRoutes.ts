// userRouter.ts
import { Router } from "express";
import { createUser } from "../controllers/userController"; // Ensure this path is correct

const router = Router();

router.post("/create-user", createUser);
export default router;

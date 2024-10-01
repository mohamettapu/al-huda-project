// userRouter.ts
import { Router } from "express";
import { createUser, login, whoAmI } from "../Controllers/userController";

const router = Router();

//
router.post("/create-user", createUser);
router.post("/login", login);
router.get("/me", whoAmI);

export default router;

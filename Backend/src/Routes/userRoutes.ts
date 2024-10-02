// userRouter.ts
import { Router } from "express";
import {
  allUsers,
  createUser,
  login,
  updateUser,
  whoAmI,
} from "../Controllers/userController";
import { authenticate } from "../helpers/authenticate";

const router = Router();

//
router.post("/create-user", createUser);
router.put("/update", authenticate, updateUser);
router.post("/login", login);
router.get("/me", whoAmI);
router.get("/list-user", allUsers);

export default router;

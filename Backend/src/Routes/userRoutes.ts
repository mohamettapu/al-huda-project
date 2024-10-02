// userRouter.ts
import { Router } from "express";
import {
  allUsers,
  changeRole,
  createUser,
  login,
  updateUser,
  whoAmI,
} from "../Controllers/userController";
import { authenticate, authorize } from "../helpers/authenticate";
import { giveNewAccesstoken } from "../helpers/jwt";

const router = Router();

//
router.post("/create-user",authenticate, authorize(["admin"]), createUser);
router.put("/update", authenticate, updateUser);
router.post("/login", login);
router.get("/me", whoAmI);
router.get("/list-user",authenticate, authorize(["admin"]), allUsers);
router.get("/new-access-token", giveNewAccesstoken);
router.put("/change-role", authenticate, authorize(["admin"]), changeRole);

export default router;

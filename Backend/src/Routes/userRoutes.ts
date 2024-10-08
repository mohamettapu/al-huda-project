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
import {
  checkResetCode,
  sendEmail,
  updatePassword,
} from "../helpers/resetPassword";

const router = Router();

//
router.post("/create-user", createUser);
router.put("/update", authenticate, updateUser);
router.post("/login", login);
router.get("/me", whoAmI);
router.get("/list-user", allUsers);
router.post("/new-access-token", giveNewAccesstoken);
router.put("/change-role", authenticate, authorize(["admin"]), changeRole);

// Step 1: Send reset code to user's email
router.post("/reset-password/send-code", sendEmail);

// Step 2: Verify the reset code
router.post("/reset-password/check-code", checkResetCode);

// Step 3: Update password
router.put("/reset-password/update", updatePassword);

export default router;

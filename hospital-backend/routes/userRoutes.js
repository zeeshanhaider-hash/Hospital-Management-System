import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutUser,
  userProfileController,
  updateProfileController,
  deleteProfileController,
  getAllUsersController,
  getUserByIdController,
  deleteProfileByIdController,
  resetPasswordRequestController,
  resetPasswordController,
  updatePasswordController,
  // ⬇️ ADD THESE THREE ⬇️
  adminCreateDoctor,
    adminCreatePatient,
  adminUpdateRole,
  getBillingReport
} from "../controllers/userController.js";

import { isAuthenticatedUser, isAdmin } from "../utils/userAuth.js";

const userRouter = express.Router();

/* =========================
   AUTH ROUTES
========================= */
userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", isAuthenticatedUser, logoutUser);

/* =========================
   PROFILE ROUTES
========================= */
userRouter.get("/me", isAuthenticatedUser, userProfileController);
userRouter.put("/update-profile", isAuthenticatedUser, updateProfileController);
userRouter.delete("/delete-profile", isAuthenticatedUser, deleteProfileController);

/* =========================
   ADMIN ROUTES
========================= */
userRouter.get("/users", isAuthenticatedUser, isAdmin("admin"), getAllUsersController);
userRouter.get("/user/:id", isAuthenticatedUser, isAdmin("admin"), getUserByIdController);
userRouter.delete("/user/:id", isAuthenticatedUser, isAdmin("admin"), deleteProfileByIdController);
userRouter.get("/billing-report", isAuthenticatedUser, isAdmin("admin"), getBillingReport);
// ADD THESE IMPORTS AT THE TOP OF THE FILE:
// import { adminCreateDoctor, adminCreatePatient, adminUpdateRole } from "../controllers/userController.js";

// ✅ Use THIS URL for Admins creating patients:
userRouter.post("/admin/create-patient", isAuthenticatedUser, isAdmin("admin"), adminCreatePatient);
userRouter.post("/admin/create-doctor", isAuthenticatedUser, isAdmin("admin"), adminCreateDoctor);
userRouter.put("/admin/update-role/:id", isAuthenticatedUser, isAdmin("admin"), adminUpdateRole);


/* =========================
   PASSWORD ROUTES
========================= */
userRouter.post("/forgot-password", resetPasswordRequestController);
userRouter.post("/reset-password/:token", resetPasswordController);
userRouter.put("/update-password", isAuthenticatedUser, updatePasswordController);

export default userRouter;
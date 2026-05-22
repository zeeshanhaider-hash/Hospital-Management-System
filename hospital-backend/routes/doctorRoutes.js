import express from "express";
import {
  createDoctorController,
  getDoctorsController,
  doctorDetailsController,
  updateDoctorController,
  deleteDoctorController
} from "../controllers/doctorController.js";

import { isAuthenticatedUser, isAdmin } from "../utils/userAuth.js";

const doctorRouter = express.Router();

/* PUBLIC */
doctorRouter.get("/", getDoctorsController);
doctorRouter.get("/:id", doctorDetailsController);

/* ADMIN ONLY */
doctorRouter.post(
  "/create",
  isAuthenticatedUser,
  isAdmin("admin"),
  createDoctorController
);

doctorRouter.put(
  "/:id",
  isAuthenticatedUser,
  isAdmin("admin"),
  updateDoctorController
);

doctorRouter.delete(
  "/:id",
  isAuthenticatedUser,
  isAdmin("admin"),
  deleteDoctorController
);

export default doctorRouter;
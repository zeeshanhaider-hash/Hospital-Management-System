import express from "express";
import {
  createPatientController,
  getMyPatientProfile,
  updatePatientController,
  deletePatientController
} from "../controllers/patientController.js";

import { isAuthenticatedUser,isPatient,isAdmin} from "../utils/userAuth.js";

const patientRouter = express.Router();

/* CREATE */
patientRouter.post("/create", isAuthenticatedUser, createPatientController);

/* GET PROFILE */
patientRouter.get("/me", isAuthenticatedUser, getMyPatientProfile);

/* UPDATE */
patientRouter.put("/update", isAuthenticatedUser, updatePatientController);

/* DELETE */
patientRouter.delete("/delete", isAuthenticatedUser, deletePatientController);

export default patientRouter;

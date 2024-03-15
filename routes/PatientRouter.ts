const express = require('express')
const patientController = require('../controller/PatientController')
const patientRouter = express.Router();

patientRouter.get("/:patientId", patientController.getPatientById);
patientRouter.get(
  "/doctor/:doctorId",
  patientController.getAllPatientsByDoctorId
);
patientRouter.get("/", patientController.getAllPatients);
patientRouter.post("/", patientController.createPatient);
patientRouter.delete("/:patientId", patientController.deletePatient);

module.exports = patientRouter;
export {}
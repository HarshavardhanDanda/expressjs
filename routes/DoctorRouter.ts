const express = require("express");
const doctorController = require("../controller/DoctorController.ts");
const doctorRouter = express.Router();

doctorRouter.get("/", doctorController.getAllDoctors);
doctorRouter.get("/:doctorId", doctorController.getDoctorById);
doctorRouter.post("/", doctorController.createDoctor);
doctorRouter.delete("/:doctorId", doctorController.deleteDoctor);
doctorRouter.put("/", doctorController.updateDoctor);

module.exports = doctorRouter;
export {}
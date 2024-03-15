// import { Doctor } from "../models/Doctor";
const Doctor = require("../models/Doctor");

exports.getAllDoctors = async (req: any, res: any) => {
  try {
    const doctors = await Doctor.findAll();
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDoctorById = async (req: any, res: any) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ error: `Couldn't find doctor with given id ${doctorId}` });
    }

    return res.status(200).json(doctor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createDoctor = async (req: any, res: any) => {
  try {
    const { name, speciality, hospital } = req.body;
    const doctor = await Doctor.create({ name, speciality, hospital });
    return res.status(201).json(doctor);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateDoctor = async (req: any, res: any) => {
  try {
    const doctorId = req.params.doctorId;
    const { name, speciality, hospital } = req.body;
    const doctor = Doctor.findByPk(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ error: `couldn't find doctor with id ${doctorId}` });
    }
    await doctor.update({ name, speciality, hospital }); // this update will work for put and patch both
    return res.status(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteDoctor = async (req: any, res: any) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ error: `couldn't find doctor with id ${doctorId}` });
    }
    await doctor.destroy();
    return res
      .status(200)
      .json({ error: `deleted doctor with id ${doctorId}` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export {};
const Patient = require("../models/Patient")
const Doctor = require("../models/Doctor");

exports.getAllPatients = async (req: any, res: any) => {
  try {
    const patients = await Patient.findAll({ include: Doctor });
    return res.status(200).json(patients);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Sever Error" });
  }
};

exports.getAllPatientsByDoctorId = async (req: any, res: any) => {
  try {
    const doctorId = req.params.doctorId;

    // here we are getting doctor with all his patients
    const doctor = await Doctor.findByPk(doctorId, { include: Patient });

    console.log(doctor);
    if (!doctor) {
      return res
        .status(404)
        .json({ error: "Doctor not found with the specified ID" });
    }
    // here we are just fetching the patients of that doctor object
    const patients = doctor.patients;

    // we can also use custom queries with sequelize
    // const patients = await sequelize.query(
    //   "SELECT * FROM Patients WHERE DoctorId = :doctorId",
    //   {
    //     replacements: { doctorId },
    //     type: QueryTypes.SELECT,
    //   }
    // );

    return res.status(200).json(patients);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Sever Error" });
  }
};

exports.getPatientById = async (req: any, res: any) => {
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res
        .status(404)
        .json({ error: `Patient not found with Id: ${patientId}` });
    }
    return res.status(200).json(patient);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Sever Error" });
  }
};

exports.createPatient = async (req: any, res: any) => {
  try {
    const { name, gender, problem } = req.body;
    const doctorId = req.query.doctorId;

    const doctor = Doctor.findByPk(doctorId); //even if we dont add this check, it will throw internal server error
    if (!doctor) {
      return res
        .status(404)
        .json({ error: `Doctor not found with Id: ${doctorId}` });
    }

    const patient = await Patient.create({ name, gender, problem, doctorId });
    return res.status(201).json(patient);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Sever Error" });
  }
};

exports.deletePatient = async (req: any, res: any) => {
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res
        .status(404)
        .json({ error: `couldn't find patient with id ${patientId}` });
    }
    await patient.destroy();
    return res
      .status(200)
      .json({ success: `deleted patient with id ${patientId}` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

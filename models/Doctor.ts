import { DataTypes } from "sequelize";
const sequelize = require("../database/db");
const Patient = require("./Patient")

export const Doctor = sequelize.define("doctor", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speciality: {
    type: DataTypes.STRING,
  },
  hospital: {
    type: DataTypes.STRING,
  },
});

// Doctor.hasMany(Patient, { onDelete: "CASCADE" }); we can use this if we want to cascade delete all the patient records aswell
// Doctor.hasMany(Patient, { onDelete: "SET NULL", foreignKey: "DoctorId" }); we can use this so all foregin keys will be set to null instead of cascade deleting, this will be efficient and maintains patient records also
//by specifying foreginKey, we can set our custom foregin key name
// Doctor.hasMany(Patient, { onDelete: "SET NULL", foreignKey: "DoctorId" });
// Patient.belongsTo(Doctor, { foreignKey: "DoctorId" }); //similar to this
//some other things we can use are:
// 1. constraints: boolean, if set to false, no foregin key constraints are created, we can delete anything we want and no error will throw regarding foregin keys
// 2. Doctor.hasMany(Patient, { as: 'PrimaryPatients', foreignKey: 'PrimaryDoctorId' });
// Doctor.hasMany(Patient, { as: 'AttendingPatients', foreignKey: 'AttendingDoctorId' }); we can use "as" for multiple relationships between tables, we can give two names
Doctor.hasMany(Patient);
Patient.belongsTo(Doctor);

module.exports = Doctor;

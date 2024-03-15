import { DataTypes, Model, Sequelize } from "sequelize";
const sequelize = require("../database/db");
// import { sequelize } from "../database/db";

export const Patient = sequelize.define("patient", {
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
  gender: {
    type: DataTypes.ENUM("Male", "Female", "Other"),
    allowNull: true,
  },
  problem: {
    type: DataTypes.STRING,
  },
});

module.exports = Patient;

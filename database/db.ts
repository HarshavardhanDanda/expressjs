import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "expressjs",
  "root",
  "Harsha@076",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
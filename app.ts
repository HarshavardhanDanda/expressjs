const express = require("express");
const app = express();
const sequelize = require("./database/db.ts");
const doctorRoutes = require('./routes/DoctorRouter')
const patientRoutes = require("./routes/PatientRouter");

app.use(express.json());

sequelize
  .sync()
  .then(() => console.log(`database sync successful`))
  .catch(() => console.log(`error while syncing`));

app.use("/doctor", doctorRoutes)
app.use("/patient", patientRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

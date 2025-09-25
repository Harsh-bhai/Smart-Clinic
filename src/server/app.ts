import express from "express";
import cors from "cors";
import patientRoutes from "@server/routes/patient.routes";
import errorHandler from "@server/middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/patients", patientRoutes);

// error handler
app.use(errorHandler);

export default app;

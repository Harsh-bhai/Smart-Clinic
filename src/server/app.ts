import express from "express";
import cors from "cors";
// import patientRoutes from "./routes/patientRoutes";
// import medicineRoutes from "./routes/medicineRoutes";

export const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON requests

// Routes
// app.use("/api/patients", patientRoutes);
// app.use("/api/medicines", medicineRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Global error handler (simple version)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("❌ Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

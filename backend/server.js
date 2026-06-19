// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./src/config/db.js";

// Routes
import reportRoutes from "./src/routes/reports.js";
import ngoRoutes from "./src/routes/ngo.js";
import adminNgoRoutes from "./src/routes/admin.js";
import rescueRoutes from "./src/routes/rescueRoutes.js";
import ngoRequestRoutes from "./src/routes/ngoRequests.js";
import ngoDashboardRoutes from "./src/routes/ngoDashboard.js";
import uploadRoutes from "./src/routes/upload.js";
import ngosNewRoutes from "./src/routes/ngos.js";


dotenv.config();
await connectDB();

const app = express();

// ===== Global Middlewares =====
app.use(cors());
app.use(express.json());

// Serve uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ===== API Routes =====
app.use("/api/reports", reportRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/api/ngos", ngosNewRoutes);
app.use("/api/admin", adminNgoRoutes);

app.use("/api/rescues", rescueRoutes);
app.use("/api/ngo/requests", ngoRequestRoutes);
app.use("/api/ngo/dashboard-stats", ngoDashboardRoutes);
app.use("/api/upload", uploadRoutes);

// Root
app.get("/", (req, res) => {
  res.send("StrayCare backend running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

});

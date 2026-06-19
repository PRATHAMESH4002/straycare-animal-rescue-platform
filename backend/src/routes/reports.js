import express from "express";
import {
  createReport, getMyReports, getReport, updateReportStatus, deleteReport
} from "../controllers/reportController.js";
import { requireAuth } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// Create (multipart/form-data with image)
router.post("/", requireAuth, upload.single("image"), createReport);

// List my reports
router.get("/me", requireAuth, getMyReports);

// Get single
router.get("/:id", requireAuth, getReport);

// Update status (admin/ngo future)
router.patch("/:id/status", requireAuth, updateReportStatus);

// Delete
router.delete("/:id", requireAuth, deleteReport);

export default router;

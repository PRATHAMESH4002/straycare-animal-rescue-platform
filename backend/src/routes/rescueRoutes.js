import express from "express";
import { requireAuth } from "../middlewares/auth.js";
import {
  createRescue,
  getPendingRescues,
  acceptRescue,
  updateStatus,
  getAllRescues,
} from "../controllers/rescueController.js";

const router = express.Router();

// USER creates rescue request
router.post("/create", createRescue);

// NGO gets pending requests
router.get("/pending", getPendingRescues);

// NGO accepts rescue
router.put("/accept/:id", acceptRescue);

// NGO updates status
router.put("/status/:id", updateStatus);

// ADMIN fetch all
router.get("/all", getAllRescues);

export default router;

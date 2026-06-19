import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { requireNgo } from "../middlewares/role.js";
import { getNgoDashboardStats } from "../controllers/ngoDashboard.js";

const router = express.Router();

router.get(
  "/",
  ClerkExpressRequireAuth(), // 🔥 REQUIRED
  // requireNgo,
  getNgoDashboardStats
);

export default router;

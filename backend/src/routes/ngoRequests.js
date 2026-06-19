import express from "express";
import { requireNgo } from "../middlewares/role.js";
import {
  getPendingRequests,
  getAcceptedRequests,
  getCompletedRequests,
  completeRequest,
  acceptRequest
} from "../controllers/ngoRequests.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

/* GET all unassigned requests */
router.get("/pending",ClerkExpressRequireAuth(), getPendingRequests);

router.put("/accept/:id", ClerkExpressRequireAuth(), acceptRequest);

router.get(
  "/accepted",
  ClerkExpressRequireAuth(),
  getAcceptedRequests
);

router.get("/completed", ClerkExpressRequireAuth(), getCompletedRequests);

/* NGO completes a request */
router.put("/:id/complete", ClerkExpressRequireAuth(), completeRequest);

export default router;

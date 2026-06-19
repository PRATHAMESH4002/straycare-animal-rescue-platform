import Ngo from "../models/Ngo.js";
import Report from "../models/Report.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

/* =============== GET DASHBOARD STATS =============== */
export const getAdminStats = async (req, res) => {
  try {
    const totalNgos = await Ngo.countDocuments({ status: "approved" });
    const pendingNgos = await Ngo.countDocuments({ status: "pending" });
    const activeRequests = await Report.countDocuments({ status: "Pending" });

    res.json({
      totalNgos,
      pendingNgos,
      activeRequests,
      platformHealth: "98%", // Just UI info, optional
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =============== GET ALL PENDING NGOS =============== */
export const getPendingNgos = async (req, res) => {
  try {
    const pending = await Ngo.find({ status: "pending" });
    res.json(pending);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =============== APPROVE NGO =============== */
export const approveNgo = async (req, res) => {
  try {
    const ngo = await Ngo.findById(req.params.id);

    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    ngo.status = "approved";
    await ngo.save();

    // Update Clerk role
    await clerkClient.users.updateUser(ngo.userId, {
      publicMetadata: { role: "ngo" },
    });

    res.json({ message: "NGO approved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =============== REJECT NGO =============== */
export const rejectNgo = async (req, res) => {
  try {
    const ngo = await Ngo.findById(req.params.id);

    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    ngo.status = "rejected";
    await ngo.save();

    res.json({ message: "NGO rejected" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =============== RESCUE REQUESTS LIST =============== */
export const getAllRescueRequests = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =============== GET APPROVED NGOS =============== */
export const getApprovedNgos = async (req, res) => {
  try {
    const approved = await Ngo.find({ status: "approved" });
    res.json(approved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

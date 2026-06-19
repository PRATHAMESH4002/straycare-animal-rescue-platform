import express from "express";
import Ngo from "../models/Ngo.js";

const router = express.Router();

// PUBLIC: Get approved NGOs
router.get("/", async (req, res) => {
  try {
    const ngos = await Ngo.find({ status: "approved" }).sort({
      createdAt: -1,
    });

    // normalize fields for frontend
    const result = ngos.map((ngo) => ({
      _id: ngo._id,
      name: ngo.ngoName,
      city: ngo.city,
      phone: ngo.phone,
      email: ngo.email,
      rating: 4.5,
    }));

    res.json(result);
  } catch (error) {
    console.error("Fetch NGOs error:", error);
    res.status(500).json({ message: "Failed to fetch NGOs" });
  }
});

export default router;


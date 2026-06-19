import Ngo from "../models/Ngo.js";

export const applyNgo = async (req, res) => {
  try {
    console.log("=== NGO APPLY HIT ===");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("AUTH:", req.auth);

    const userId = req.auth.userId;

    const existingNgo = await Ngo.findOne({ userId });

    if (existingNgo) {
      return res.status(400).json({
        message: "Application already submitted",
      });
    }

    const documentUrl = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const ngo = await Ngo.create({
      userId,
      ngoName: req.body.ngoName,
      phone: req.body.phone,
      city: req.body.city,
      address: req.body.address,
      description: req.body.description,
      documentUrl,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "NGO application submitted successfully",
      ngo,
    });
  } catch (error) {
    console.error("NGO APPLY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyNgoApplication = async (req, res) => {
  try {
    const ngo = await Ngo.findOne({
      userId: req.auth.userId,
    });

    res.json(ngo || null);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getApprovedNgos = async (req, res) => {
  try {
    const approved = await Ngo.find({
      status: "approved",
    });

    res.json(approved);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
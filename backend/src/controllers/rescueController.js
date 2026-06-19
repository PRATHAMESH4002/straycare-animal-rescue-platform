import RescueRequest from "../models/RescueRequest.js";
import Report from "../models/Report.js";

// USER → Create rescue request from report
export const createRescue = async (req, res) => {
  try {
    const { reportId } = req.body;

    const report = await Report.findById(reportId);
    if (!report) return res.status(404).json({ message: "Report not found" });

    const rescue = await RescueRequest.create({
      reportId,
      userId: req.userId,
      status: "pending",
    });

    return res.json({ message: "Rescue request created", rescue });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// NGO → Get pending rescue requests
export const getPendingRescues = async (req, res) => {
  try {
    const rescues = await RescueRequest.find({ status: "pending" })
      .populate("reportId");
    return res.json(rescues);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// NGO → Accept rescue request
export const acceptRescue = async (req, res) => {
  try {
    const { id } = req.params;

    const rescue = await RescueRequest.findById(id);
    if (!rescue) return res.status(404).json({ message: "Not found" });

    rescue.status = "accepted";
    rescue.ngoId = req.userId;
    await rescue.save();

    return res.json({ message: "Rescue Accepted", rescue });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// NGO → Update status
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const rescue = await RescueRequest.findById(id);
    if (!rescue) return res.status(404).json({ message: "Not found" });

    rescue.status = status;
    rescue.notes = notes || rescue.notes;
    await rescue.save();

    return res.json({ message: "Status Updated", rescue });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ADMIN → Get all rescues
export const getAllRescues = async (req, res) => {
  try {
    const rescues = await RescueRequest.find()
      .populate("reportId");
    return res.json(rescues);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getApprovedNgos = async (req, res) => {
  try {
    const approved = await Ngo.find({ status: "approved" });
    res.json(approved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


import Report from "../models/Report.js";

export const getNgoDashboardStats = async (req, res) => {
  try {
    console.log("AUTH OBJECT:", req.auth);
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const ngoId = req.auth.userId;

    const pending = await Report.countDocuments({
      status: "Pending",
      assignedNgo: null,
    });

    const accepted = await Report.countDocuments({
      status: "Accepted",
      assignedNgo: ngoId,
    });

    const completed = await Report.countDocuments({
      status: "Completed",
      assignedNgo: ngoId,
    });

    return res.json({
      pending,
      accepted,
      completed,
    });
  } catch (error) {
    console.error("NGO Dashboard Stats Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

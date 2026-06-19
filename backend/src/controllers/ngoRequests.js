import Report from "../models/Report.js";

/**
 * ✅ Get ALL pending rescue requests
 * Visible to ALL NGOs (unassigned)
 */
export const getPendingRequests = async (req, res) => {
  try {
    const requests = await Report.find({
      status: "Pending"
    }).sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Pending request error:", error);
    res.status(500).json({ message: error.message });
  }
};




/**
 * ✅ NGO accepts a rescue request
 */
export const getAcceptedRequests = async (req, res) => {
  try {
    const ngoClerkId = req.auth.userId;

    const requests = await Report.find({
      status: "Accepted",
      assignedNgo: ngoClerkId
    }).sort({ updatedAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Accepted fetch error:", error);
    res.status(500).json({ message: error.message });
  }
};



/**
 * ✅ Mark request as completed
 */
export const getCompletedRequests = async (req, res) => {
  try {
    const ngoClerkId = req.auth.userId;

    const requests = await Report.find({
      status: "Completed",
      assignedNgo: ngoClerkId,
    }).sort({ updatedAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Completed fetch error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const completeRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const ngoClerkId = req.auth.userId;

    const report = await Report.findOne({
      _id: id,
      assignedNgo: ngoClerkId,
      status: "Accepted",
    });

    if (!report) {
      return res.status(404).json({
        message: "Request not found or not assigned to this NGO",
      });
    }

    report.status = "Completed";
    await report.save();

    res.json({
      message: "Request marked as completed",
      report,
    });
  } catch (error) {
    console.error("Complete request error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const ngoClerkId = req.auth.userId;

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // 🔥 THIS IS THE KEY PART
    report.status = "Accepted";
    report.assignedNgo = ngoClerkId;

    await report.save();

    res.json({
      message: "Request accepted",
      report,
    });
  } catch (error) {
    console.error("Accept request error:", error);
    res.status(500).json({ message: error.message });
  }
};



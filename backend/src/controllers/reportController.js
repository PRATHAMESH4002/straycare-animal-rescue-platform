import Report from "../models/Report.js";

// ================= CREATE REPORT =================
export const createReport = async (req, res) => {
  try {
    if (!req.auth?.userId) {
  return res.status(401).json({ message: "Unauthorized" });
}

    const {
      animalType,
      description,
      severity,
      address,
      lat,
      lng,
      reporterName,
      reporterEmail,
    } = req.body;

    // ✅ CLERK USER ID (CORRECT)
    const reporterId = req.auth.userId;

   const imageUrl = req.file
  ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
  : null;


    const report = await Report.create({
      reporterId,
      reporterName,
      reporterEmail,
      animalType,
      description,
      severity,
      imageUrl,
      location: {
        address,
        lat: lat ? Number(lat) : undefined,
        lng: lng ? Number(lng) : undefined,
      },
      status: "Pending",
      assignedNgo: null,
    });

    res.status(201).json({ success: true, data: report });
  } catch (err) {
    console.error("Create report error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================= GET MY REPORTS =================
export const getMyReports = async (req, res) => {
  try {
    if (!req.auth?.userId) {
  return res.status(401).json({ message: "Unauthorized" });
}

    // ✅ CLERK USER ID
    const userId = req.auth.userId;

    const page = parseInt(req.query.page || "1");
    const limit = parseInt(req.query.limit || "20");
    const skip = (page - 1) * limit;

    const [total, reports] = await Promise.all([
      Report.countDocuments({ reporterId: userId }),
      Report.find({ reporterId: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ]);

    res.json({ success: true, total, page, limit, data: reports });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET SINGLE REPORT =================
export const getReport = async (req, res) => {
  try {
    const r = await Report.findById(req.params.id);
    if (!r) return res.status(404).json({ message: "Not found" });
    res.json({ success: true, data: r });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE STATUS =================
export const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const r = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ success: true, data: r });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE REPORT =================
export const deleteReport = async (req, res) => {
  try {
    const r = await Report.findById(req.params.id);
    if (!r) return res.status(404).json({ message: "Not found" });

    // ✅ CLERK USER ID CHECK
    if (r.reporterId !== req.auth.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await r.deleteOne();
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

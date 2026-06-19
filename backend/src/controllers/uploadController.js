export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ ok: false, message: "No file uploaded" });
    }

    // Local file path (static)
    const fileUrl = `/uploads/${req.file.filename}`;

    return res.json({
      ok: true,
      fileUrl,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    return res.status(500).json({ ok: false, message: "Upload failed" });
  }
};

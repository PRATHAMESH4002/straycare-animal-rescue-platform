// src/config/multer.js
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// ------ Local disk storage ------
const storageDisk = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // keep original name or create unique name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const uploadLocal = multer({
  storage: storageDisk,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// ------ Memory storage (for S3) ------
const storageMemory = multer.memoryStorage();
export const uploadMemory = multer({
  storage: storageMemory,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
});

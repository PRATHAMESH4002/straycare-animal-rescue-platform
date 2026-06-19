import express from "express";
import multer from "multer";
import path from "path";
import { uploadFile } from "../controllers/uploadController.js";

const router = express.Router();

// LOCAL STORAGE SETUP
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), uploadFile);

export default router;

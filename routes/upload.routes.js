import express from 'express';
import multer from 'multer';
import { uploadPdf } from '../controllers/upload.controller.js';
import Pdf from '../models/Pdf.model.js';

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// ✅ Allow all file types
const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

// POST route to upload any file + data
router.post("/upload-file", upload.single("file"), uploadPdf);

// GET route to list all files
router.get("/download-files", async (req, res) => {
  try {
    const files = await Pdf.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Files fetched successfully",
      data: files,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

export default router;

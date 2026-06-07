import express from "express";
import upload from "../middleware/upload";
import protect from "../middleware/authMiddleware";
import Document from "../models/Document";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("pdf"),
  async (req, res) => {
    try {
      console.log("=== REQUEST RECEIVED ===");
      console.log("req.file:", req.file);

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const document = await Document.create({
        fileName: req.file.filename,
        filePath: req.file.path,
      });

      return res.status(201).json({
        success: true,
        message: "File Uploaded Successfully",
        document,
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Upload Failed",
      });
    }
  }
);

export default router;
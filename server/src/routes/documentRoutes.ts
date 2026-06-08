import express from "express";
import {
  getDocuments,
  uploadDocument,
} from "../controllers/documentController";

import protect from "../middleware/authMiddleware";
import upload from "../middleware/upload";

const router = express.Router();

// Get all documents of logged-in user
router.get("/", protect, getDocuments);

// Upload PDF
router.post(
  "/upload",
  protect,
  upload.single("pdf"), // Postman key must be "pdf"
  uploadDocument
);

export default router;
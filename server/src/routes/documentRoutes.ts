import express from "express";
import {
  getDocuments,
  uploadDocument,
  downloadSignedPdf,
} from "../controllers/documentController";
import protect from "../middleware/authMiddleware";
import upload from "../middleware/upload";

const router = express.Router();

router.get("/", protect, getDocuments);

router.post(
  "/upload",
  protect,
  upload.single("pdf"),
  uploadDocument
);

router.get(
  "/download/:id",
  downloadSignedPdf
);

export default router;
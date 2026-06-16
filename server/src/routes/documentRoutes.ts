import express from "express";
import {
  getDocuments,
  uploadDocument,
} from "../controllers/documentController";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, getDocuments);

router.post(
  "/upload",
  protect,
  uploadDocument
);

export default router;
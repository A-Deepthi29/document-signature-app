import express from "express";

import {
  generateSignedPdf,
} from "../controllers/pdfController";

const router = express.Router();

router.get(
  "/generate/:fileId",
  generateSignedPdf
);

export default router;
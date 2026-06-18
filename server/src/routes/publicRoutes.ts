import express from "express";
import { getPublicSignature } from "../controllers/signatureController";
import { updateSignatureStatus } from "../controllers/signatureController";

const router = express.Router();

/*
GET PUBLIC SIGNATURE
http://localhost:5000/api/public/sign/:token
*/
router.get(
  "/sign/:token",
  getPublicSignature
);

/*
UPDATE STATUS
http://localhost:5000/api/public/sign/:token
*/
router.put(
  "/sign/:token",
  updateSignatureStatus
);

export default router;

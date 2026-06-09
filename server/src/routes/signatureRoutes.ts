import express from "express";

import {
  createSignature,
  getSignatures,
} from "../controllers/signatureController";

const router = express.Router();

router.post(
  "/",
  createSignature
);

router.get("/", getSignatures);

export default router;
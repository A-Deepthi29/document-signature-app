import express from "express";
import Signature from "../models/Signature";
import { getPublicSignature } from "../controllers/signatureController";

const router = express.Router();
router.get(
  "/sign/:token",
  getPublicSignature
);

router.get(
  "/sign/:token",
  async (req, res) => {
    try {
      const signature =
        await Signature.findOne({
          token: req.params.token,
        });

      if (!signature) {
        return res.status(404).json({
          message: "Invalid Link",
        });
      }

      res.json(signature);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export default router;
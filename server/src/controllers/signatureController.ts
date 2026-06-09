import { Request, Response } from "express";
import Signature from "../models/Signature";

export const createSignature = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      fileId,
      signer,
      x,
      y,
    } = req.body;

    const signature =
      await Signature.create({
        fileId,
        signer,
        x,
        y,
      });

    res.status(201).json(signature);
  } catch (error: any) {
  console.error("SIGNATURE ERROR:", error);

  res.status(500).json({
    message: error.message,
  });
}
};

export const getSignatures = async (
  req: Request,
  res: Response
) => {
  try {
    const signatures =
      await Signature.find();

    res.status(200).json(signatures);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch signatures",
    });
  }
};
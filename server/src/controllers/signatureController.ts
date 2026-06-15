import { Request, Response } from "express";
import Signature from "../models/Signature";
import { sendEmail } from "../utils/sendEmail";
import { createAuditLog } from "../middleware/auditMiddleware";
// signatureController.ts

import { v4 as uuidv4 } from "uuid";

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

    const token = uuidv4();

    const signature =
  await Signature.create({
    fileId,
    signer,
    x,
    y,
    status: "pending",
    token,
  });

await createAuditLog(
  fileId,
  signer,
  "Signature Created",
  req.ip || "Unknown"
);

const publicLink =
  `http://localhost:5000/api/public/sign/${token}`;

await sendEmail(
  "deepthiaavula@gmail.com",
  "Document Signature Request",
  `Please sign the document using this link:\n\n${publicLink}`
);

    res.status(201).json({
      message:
        "Signature created and email sent",
      signature,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Failed to create signature",
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

export const getPublicSignature = async (
  req: Request,
  res: Response
) => {
  try {
    const { token } = req.params;

    const signature = await Signature.findOne({
      token: token,
    });

    if (!signature) {
      return res.status(404).json({
        message: "Invalid Link",
      });
    }

    res.status(200).json(signature);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateSignatureStatus =
  async (
    req: Request,
    res: Response
  ) => {
    try {
     const { token } = req.params;

const {
  status,
  rejectionReason,
} = req.body;

console.log("Status received:", status);

      const signature = await Signature.findOne({
  token,
});

if (!signature) {
  return res.status(404).json({
    message: "Invalid Link",
  });
}

signature.status = status;

if (status === "rejected") {
  signature.rejectionReason =
    rejectionReason;
}

await signature.save();

console.log(
  "Saved Status:",
  signature.status
);

const fileId =
  signature.fileId?.toString();

const signer =
  signature.signer;

if (!fileId || !signer) {
  return res.status(400).json({
    message:
      "Invalid signature data",
  });
}

await createAuditLog(
  fileId,
  signer,
  `Status Changed To ${status}`,
  req.ip || "Unknown"
);

console.log("Status received:", status);
console.log("Token:", token);
console.log("Saved Status:", signature.status);
      res.status(200).json({
        message:
          "Status Updated Successfully",
        signature,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to update status",
      });
    }
  };
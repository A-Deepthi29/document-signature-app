import { Request, Response } from "express";
import Signature from "../models/Signature";
import { sendEmail } from "../utils/sendEmail";
import { createAuditLog } from "../middleware/auditMiddleware";
import fs from "fs";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";
import Document from "../models/Document";
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
`https://document-signature-app-git-main-a-deepthi29s-projects.vercel.app/sign/${token}`;
console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("PUBLIC LINK:", publicLink);
console.log("ABOUT TO SEND EMAIL");

// await sendEmail(
//   "deepthiaavula@gmail.com",
//   "Document Signature Request",
//   `Please sign the document using this link:\n\n${publicLink}`
// );

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

const generateSignedPdf = async (
  fileId: string
) => {
  const document =
    await Document.findById(fileId);

  if (!document) {
    throw new Error(
      "Document not found"
    );
  }

 const signature =
  await Signature.findOne({
    fileId,
  }).sort({ createdAt: -1 });

  if (!signature) {
    throw new Error(
      "Signature not found"
    );
  }

  const pdfPath = path.join(
    process.cwd(),
    document.filePath
  );

  const existingPdfBytes =
    fs.readFileSync(pdfPath);

  const pdfDoc =
    await PDFDocument.load(
      existingPdfBytes
    );

  const page =
    pdfDoc.getPages()[0];
console.log(
  "SIGN POSITION:",
  signature.x,
  signature.y
);
  page.drawText(
    `Signed By: ${signature.signer}`,
    {
      x: signature.x || 120,
      y:
        page.getHeight() -
        (signature.y || 300),
      size: 16,
      color: rgb(0, 0, 1),
    }
  );

  const pdfBytes =
    await pdfDoc.save();

  const signedFileName =
    `signed-${Date.now()}.pdf`;

  const signedPdfPath =
    `uploads/${signedFileName}`;

  fs.writeFileSync(
    signedPdfPath,
    pdfBytes
  );

  return signedPdfPath;
};

export const updateSignatureStatus =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const { token } =
        req.params;

      const {
        status,
        rejectionReason,
      } = req.body;

      const signature =
        await Signature.findOne({
          token,
        });

      if (!signature) {
        return res.status(404).json({
          message:
            "Invalid Link",
        });
      }

      signature.status = status;

      if (
        status === "rejected"
      ) {
        signature.rejectionReason =
          rejectionReason;
      }

      await signature.save();

      const fileId =
        signature.fileId?.toString();

      const signer =
        signature.signer;

      if (
        !fileId ||
        !signer
      ) {
        return res.status(400).json({
          message:
            "Invalid signature data",
        });
      }

      if (
        status === "signed"
      ) {

        const signedPdfPath =
          await generateSignedPdf(
            fileId
          );

        await Document.findByIdAndUpdate(
          fileId,
          {
            status: "Signed",
            signedPdfPath,
          }
        );
      }

      await createAuditLog(
        fileId,
        signer,
        `Status Changed To ${status}`,
        req.ip || "Unknown"
      );

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
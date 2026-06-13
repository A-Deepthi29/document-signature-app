import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";

import Document from "../models/Document";
import Signature from "../models/Signature";

export const generateSignedPdf = async (
  req: Request,
  res: Response
) => {
  try {
    const { fileId } = req.params;

    const document = await Document.findById(fileId);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const signature = await Signature.findOne({
      fileId,
    });

    if (!signature) {
      return res.status(404).json({
        message: "Signature not found",
      });
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

    if (
  signature.x == null ||
  signature.y == null
) {
  return res.status(400).json({
    message:
      "Signature coordinates missing",
  });
}
page.drawText(
  `Signed By: ${signature.signer}`,
  {
    x: signature.x,
    y:
      page.getHeight() -
      signature.y,
    size: 14,
    color: rgb(0, 0, 1),
  }
);

    const pdfBytes =
      await pdfDoc.save();

    const outputPath =
      `uploads/signed-${Date.now()}.pdf`;

    fs.writeFileSync(
      outputPath,
      pdfBytes
    );

    res.status(200).json({
      message:
        "Signed PDF Generated",
      file: outputPath,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error generating PDF",
    });
  }
};
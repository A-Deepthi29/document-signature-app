import { Request, Response } from "express";
import Document from "../models/Document";

export const getDocuments = async (
  req: Request,
  res: Response
) => {
  try {
    const docs = await Document.find({
      uploadedBy: (req as any).user.id,
    });

    res.status(200).json(docs);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch documents",
    });
  }
};

export const uploadDocument = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("FILE:", req.file);
    console.log("USER:", (req as any).user);

    if (!req.file) {
      return res.status(400).json({
        message: "No PDF uploaded",
      });
    }

    const document = await Document.create({
  fileName: req.file.filename,
  filePath: `uploads/${req.file.filename}`,
  uploadedBy: (req as any).user.id,
});

    res.status(201).json({
      message: "PDF uploaded successfully",
      document,
    });
  } catch (error: any) {
  console.error("UPLOAD ERROR:", error);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

export const downloadSignedPdf =
  async (
    req: Request,
    res: Response
  ) => {

    const document =
      await Document.findById(
        req.params.id
      );

    if (
      !document ||
      !document.signedPdfPath
    ) {
      return res.status(404).json({
        message:
          "Signed PDF not found",
      });
    }

    res.download(
      document.signedPdfPath
    );
  };
import { Request, Response } from "express";
import Audit from "../models/Audit";

export const getAuditLogs = async (
  req: Request,
  res: Response
) => {
  try {
    const { fileId } = req.params;

    const logs = await Audit.find({
      fileId,
    });

    res.status(200).json(logs);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch audit logs",
    });
  }
};
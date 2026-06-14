import Audit from "../models/Audit";

export const createAuditLog = async (
  fileId: string,
  signer: string,
  action: string,
  ipAddress: string
) => {
  try {
    await Audit.create({
      fileId,
      signer,
      action,
      ipAddress,
    });
  } catch (error) {
    console.log(error);
  }
};
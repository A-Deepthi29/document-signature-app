import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
  {
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    signer: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    ipAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Audit",
  auditSchema
);
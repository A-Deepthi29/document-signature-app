import mongoose from "mongoose";

const signatureSchema = new mongoose.Schema(
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
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
    },

    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Signature",
  signatureSchema
);
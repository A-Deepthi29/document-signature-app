import mongoose from "mongoose";

const signatureSchema = new mongoose.Schema(
  {
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },

    signer: String,

    x: Number,

    y: Number,

    

   status: {
  type: String,
  enum: ["pending", "signed", "rejected"],
  default: "pending",
},

rejectionReason: {
  type: String,
  default: "",
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
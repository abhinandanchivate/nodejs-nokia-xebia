import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    assetName: { type: String, required: true },
    assetType: { type: String, required: true },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deployedDate: { type: String },
    status: { type: String, default: "available" },
  },
  { timestamps: true }
);

export default mongoose.model("Asset", assetSchema);

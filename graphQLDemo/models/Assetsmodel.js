// assetId : would be auto gen
// assetName : string
// assetType : string
// // assetValue : number
// assetLocation : string
// assignedTo : string
// deployedDate : date
// status { type : string
// // enum : ['available', 'assigned', 'maintenance', 'lost'] default : 'available'}

import mongoose from "mongoose";
const assetSchema = new mongoose.Schema(
  {
    assetName: { type: String, required: true },
    assetType: { type: String, required: true },
    assetLocation: { type: String, required: true },
    assignedTo: { type: String, required: true },
    deployedDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["available", "assigned", "maintenance", "lost"],
      default: "available",
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);
export default mongoose.model("Asset", assetSchema);

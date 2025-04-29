import mongoose from "mongoose";

const TransferInfo = new mongoose.Schema(
  {
    description: { type: String, required: true },
    images: { type: Array, required: true, default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("TransferInfo", TransferInfo);

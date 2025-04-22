import mongoose from "mongoose";

const TransferInfo = new mongoose.Schema(
  {
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("TransferInfo", TransferInfo);

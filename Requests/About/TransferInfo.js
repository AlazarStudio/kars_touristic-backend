import mongoose from "mongoose";

const TransferInfo = new mongoose.Schema(
  {
    description: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("TransferInfo", TransferInfo);

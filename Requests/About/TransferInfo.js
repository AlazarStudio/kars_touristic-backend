import mongoose from "mongoose";

const TransferInfo = new mongoose.Schema(
  {
    transferInfo: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("TransferInfo", TransferInfo);

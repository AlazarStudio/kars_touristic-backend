import mongoose from "mongoose";

const FaqInfo = new mongoose.Schema(
  {
    description: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("FaqInfo", FaqInfo);

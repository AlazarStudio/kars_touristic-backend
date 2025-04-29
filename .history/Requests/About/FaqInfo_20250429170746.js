import mongoose from "mongoose";

const FaqInfo = new mongoose.Schema(
  {
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default mongoose.model("FaqInfo", FaqInfo);

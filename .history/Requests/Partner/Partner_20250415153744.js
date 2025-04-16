import mongoose from "mongoose";

const Partner = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "" },
    description: { type: String, required: true, default: "" },
    link: { type: String, required: false, default: "" },
    img: { type: Array, required: true, default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Partner", Partner);

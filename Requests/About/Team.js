import mongoose from "mongoose";

const Team = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imgPath: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Team", Team);

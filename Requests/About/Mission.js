import mongoose from "mongoose";

const Mission = new mongoose.Schema(
  {
    mission: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Mission", Mission);

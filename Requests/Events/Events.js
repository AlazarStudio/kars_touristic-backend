import mongoose from "mongoose";

const Events = new mongoose.Schema(
  {
    title: { type: String, required: true, default: "" },
    description: { type: String, required: true, default: "" },
    mapLink: { type: String, required: true, default: "" },

    mainPhoto: { type: String, default: "" },
    photos: { type: Array, required: true, default: [] },
    region: { type: String, required: true, default: "" },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Events", Events);

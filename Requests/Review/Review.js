import mongoose from "mongoose";

const Review = new mongoose.Schema(
  {
    title: { type: String, required: false, default: "" },
    description: { type: String, required: false, default: "" },
    photos: { type: Array, required: false, default: [] },

    hotelID: { type: String, required: false },
    roomID: { type: String, required: false },
    oneTourID: { type: String, required: false },
    multiTourID: { type: String, required: false },
    autorTourID: { type: String, required: false },
    userID: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Review", Review);

import mongoose from "mongoose";

const Review = new mongoose.Schema(
  {
    text: { type: String, required: false, default: "" },
    rating: { type: Number, required: false, default: "" },

    hotelID: { type: String, required: false },
    roomID: { type: String, required: false },
    oneTourID: { type: String, required: false },
    multiTourID: { type: String, required: false },
    autorTourID: { type: String, required: false },
    userID: { type: String, required: true },
    visible: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Review", Review);

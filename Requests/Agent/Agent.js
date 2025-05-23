import mongoose from "mongoose";

const Agent = new mongoose.Schema(
  {
    price: { type: String, required: true },
    agent: { type: String, required: true },
    bronTypeRole: { type: String, required: true },
    paymentType: { type: String, required: true },
    tours: { type: Array, required: true },
    passengers: { type: Array, required: true },
    bookingDate: { type: String, required: true },
    bookingTime: { type: String, required: true },
    paymanetState: { type: String, required: true, default: "processing" },
    status: { type: Boolean, required: true, default: false },
    confirm: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Agent", Agent);

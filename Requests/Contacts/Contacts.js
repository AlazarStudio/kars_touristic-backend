import mongoose from "mongoose";

const Contacts = new mongoose.Schema(
  {
    adress: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    images: { type: Array, required: true, default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Contacts", Contacts);

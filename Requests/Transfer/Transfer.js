import mongoose from "mongoose";

const Transfer = new mongoose.Schema(
  {
    title: { type: String, required: false },
    description: { type: String, required: false },
    link: { type: String, required: false },

    region: { type: String, required: false },
    from: { type: String, required: false },
    to: { type: String, required: false },
    passengers: { type: Number, required: false },
    dateTime: { type: String, required: false },
    transportClass: { type: String, required: false },
    transportType: { type: String, required: false },
    additionalServices: { type: Array, required: false },

    personName: { type: String, required: false },
    personPhone: { type: String, required: false },
    personEmail: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("Transfer", Transfer);

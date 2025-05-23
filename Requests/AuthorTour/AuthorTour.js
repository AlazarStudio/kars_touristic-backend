import mongoose from "mongoose";

const AuthorTour = new mongoose.Schema(
  {
    tourTitle: { type: String, required: true },
    travelMethod: { type: String, required: true },
    duration: { type: String, required: true },
    departureTime: { type: String, required: true },
    tourType: { type: String, required: true },
    difficulty: { type: String, required: true },
    cost: { type: String, required: true },
    optional: { type: String, required: false },
    typeOfBron: { type: String, required: false },

    min: { type: String, required: false },
    max: { type: String, required: false },

    mainPhoto: { type: String, default: "" },

    places: { type: Array, required: true },
    checklists: { type: Array, required: false },
    entries: { type: Array, required: true },
    days: { type: Array, required: true },
    photos: { type: Array, required: true },

    departureDates: { type: Array, required: true },

    region: { type: String, required: true },
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    modered: { type: String, required: true, default: false },
    comment: { type: String, required: false, default: "" },

    order: { type: Number, required: true, default: 0 },
    review: { type: Array, required: false, default: [] },
    visible: { type: Boolean, required: true, default: true },
    popular: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("AuthorTour", AuthorTour);

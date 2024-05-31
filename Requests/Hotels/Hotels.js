import mongoose from "mongoose";

const Hotels = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    moreInfo: { type: String, required: true },
    stars: { type: Number, required: true, default: 0 },

    items:{ type: Array, required: true },
    galery: { type: Array, required: true },
    feedbacks: { type: Array, required: true },
    links: { type: Array, required: true },

    rooms: { type: Array, required: true },

    region: { type: String, required: true },

    order: { type: Number, required: true, default: 0 },
}, { timestamps: true });

export default mongoose.model('Hotels', Hotels);

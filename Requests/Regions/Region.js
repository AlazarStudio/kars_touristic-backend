import mongoose from "mongoose";

const Region = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconPath: { type: Array, required: true, default: [] },
    coverImgPath: { type: Array, required: true, default: [] },
    backgroundImgPath: { type: Array, required: true, default: [] },

    link: { type: String, required: true, default: '' },
    order: { type: Number, required: true, default: 0 },
}, { timestamps: true });

export default mongoose.model('Region', Region);

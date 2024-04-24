import mongoose from "mongoose";

const Region = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconPath: { type: String, required: true },
    backgroundImgPath: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Region', Region);

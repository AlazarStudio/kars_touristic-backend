import mongoose from "mongoose";

const Transfer = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    link: { type: String, required: true},
}, { timestamps: true });

export default mongoose.model('Transfer', Transfer);

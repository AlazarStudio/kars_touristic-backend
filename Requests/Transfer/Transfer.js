import mongoose from "mongoose";

const Transfer = new mongoose.Schema({
    title: { type: String, required: false},
    description: { type: String, required: false},
    link: { type: String, required: false},
}, { timestamps: true });

export default mongoose.model('Transfer', Transfer);

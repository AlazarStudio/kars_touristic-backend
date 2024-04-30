import mongoose from "mongoose";

const Turagent = new mongoose.Schema({
    description: { type: String, required: true},
    docPath: { type: String, required: true},
}, { timestamps: true });

export default mongoose.model('Turagent', Turagent);

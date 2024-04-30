import mongoose from "mongoose";

const AboutCompany = new mongoose.Schema({
    aboutCompany: { type: String, required: true},
}, { timestamps: true });

export default mongoose.model('AboutCompany', AboutCompany);

import mongoose from "mongoose";

const Agent = new mongoose.Schema({
    price: { type: String, required: true },
    agent: { type: String, required: true },
    paymentType: { type: String, required: true },
    
    tours: { type: Array, required: true },
    passengers: { type: Array, required: true },
    paymanetState: { type: String, required: true, default: 'processing' },
}, { timestamps: true });

export default mongoose.model('Agent', Agent);

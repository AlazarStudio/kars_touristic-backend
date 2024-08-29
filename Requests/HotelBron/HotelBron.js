import mongoose from "mongoose";

const HotelBron = new mongoose.Schema({
    name: { type: String, required: true },
    adress: { type: String, required: true },
    guests: { type: String, required: true },
    price: { type: String, required: true },
    roomNumber: { type: String, required: true },
    arrivalDate: { type: Date, required: true },
    departureDate: { type: Date, required: true },
    client: { type: Object, required: true },
}, { timestamps: true });

export default mongoose.model('HotelBron', HotelBron);
import mongoose from "mongoose";

const HotelBron = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    name: { type: String, required: true }, // Название гостиницы
    roomNumber: { type: String, required: true }, // Название номера
    arrivalDate: { type: Date, required: true },
    departureDate: { type: Date, required: true },
    price: { type: Number, required: true },
    fullPrice: { type: Number, required: true },
    guests: { type: Number, required: true },
    status: { type: String, default: "В ожидании" }, // Например: "pending", "confirmed", "canceled"
    client: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      passportNumber: { type: String, required: true },
      passportSeries: { type: String, required: true },
      gender: { type: String, required: true },
      birthDate: { type: Date, required: true },
    }
  },
  { timestamps: true }
);

export default mongoose.model("HotelBron", HotelBron);

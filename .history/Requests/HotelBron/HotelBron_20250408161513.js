import mongoose from "mongoose";

const HotelBronSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true }, // ID пользователя, который бронировал

    fullName: { type: String, required: true }, // ФИО
    phone: { type: String, required: true },    // номер телефона
    email: { type: String, required: true },    // почта

    passportSeries: { type: String, required: true }, // паспорт серия
    passportNumber: { type: String, required: true }, // паспорт номер
    birthDate: { type: Date, required: true },        // дата рождения

    hotelName: { type: String, required: true },      // название гостиницы
    roomName: { type: String, required: true },       // название номера

    arrivalDate: { type: Date, required: true },      // дата заезда
    departureDate: { type: Date, required: true },    // дата выезда

    status: { type: String, default: "в ожидании" },  // статус (например: в ожидании, подтверждено, отменено)
    price: { type: Number, required: true },          // цена
    guests: { type: Number, required: true },         // количество гостей
  },
  { timestamps: true }
);

export default mongoose.model("HotelBron", HotelBronSchema);

import mongoose from "mongoose";

const Rooms = new mongoose.Schema(
  {
    title: { type: String, required: true, default: "" },
    description: { type: String, required: true, default: "" },
    places: { type: String, required: true, default: "" },
    price: { type: String, required: true, default: "" },

    // Параметры номера
    square: { type: String, required: true, default: "" }, //Площадь
    bed: { type: String, required: true, default: "" }, //Кровать
    additionally: { type: String, required: true, default: "" }, //Дополнительно
    cleaning: { type: String, required: true, default: "" }, //Уборка
    changeOfLinen: { type: String, required: true, default: "" }, //Смена белья
    food: { type: String, required: true, default: "" }, //Питание
    type: { type: String, required: true, default: "" }, //Вид из окна

    inRoom: { type: Array, required: true, default: [] },
    accessories: { type: Array, required: true, default: [] },

    mainPhoto: { type: String, default: "" },

    photos: { type: Array, required: true, default: [] },

    region: { type: String, required: true, default: "" },
    hotelID: { type: String, required: true, default: "" },

    order: { type: Number, required: true, default: 0 },
    review: { type: Array, required: false, default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Rooms", Rooms);

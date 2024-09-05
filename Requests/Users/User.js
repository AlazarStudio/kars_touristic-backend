import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },

    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    
    address: { type: String, required: false },
    passportNumber: { type: String, required: false },
    passportSeries: { type: String, required: false },
    gender: { type: String, required: false },
    birthDate: { type: String, required: false },

    likes: { type: Array, required: true, default: [] },
    cart: { type: Array, required: true, default: [] },
    role: { type: String, required: true, default: "user" },
    debt: { type: Number, required: true, default: 0 },
    
    adminPanelAccess: { type: Boolean, required: true, default: false },
    multidayTours_Touragent: { type: Array, required: true, default: [] },
    onedayTours_Touragent: { type: Array, required: true, default: [] },
}, { timestamps: true })

export default mongoose.model('Users', User)

import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    likes: { type: Array, required: true, default: [] },
    cart: { type: Array, required: true, default: [] },
    role: { type: String, required: true, default: "user" },
    adminPanelAccess: { type: Boolean, required: true, default: false }
}, { timestamps: true })

export default mongoose.model('Users', User)

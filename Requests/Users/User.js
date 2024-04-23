import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String, required: true, default: "user"},
}, { timestamps: true })

export default mongoose.model('Users', User)

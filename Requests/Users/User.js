import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
}, { timestamps: true })

export default mongoose.model('Users', User)

import mongoose from "mongoose";

const Hotels = new mongoose.Schema({
    title: { type: String, required: true, default: '' },
    description: { type: String, required: true, default: '' },
    moreInfo: { type: String, required: true, default: '' },
    stars: { type: Number, required: true, default: 0 },

    mainPhoto: { type: String,  default: ''},
    
    galery: { type: Array, required: true, default: [] },
    items:{ type: Array, required: true, default: [] },
    links: { type: Array, required: true, default: [] },
    
    feedbacks: { type: Array, required: true, default: [] },
    rooms: { type: Array, required: true, default: []},

    region: { type: String, required: true, default: '' },

    order: { type: Number, required: true, default: 0 },
}, { timestamps: true });

export default mongoose.model('Hotels', Hotels);

import mongoose from "mongoose";

const OnedayTour = new mongoose.Schema({
    tourTitle: { type: String, required: true },
    travelMethod: { type: String, required: true },
    duration: { type: String, required: true },
    departureTime: { type: String, required: true },
    tourType: { type: String, required: true },
    difficulty: { type: String, required: true },
    cost: { type: String, required: true },
    optional: { type: String, required: false },
    typeOfBron: { type: String, required: false },
    
    min: { type: String, required: false },
    max: { type: String, required: false },
    
    mainPhoto: { type: String, default: ''},
    
    places: { type: Array, required: true },
    checklists: { type: Array, required: true },
    days: { type: Array, required: true },
    photos: { type: Array, required: true },
    
    departureDates: { type: Array, required: true },

    region: { type: String, required: true },
    
    order: { type: Number, required: true, default: 0 },
}, { timestamps: true });

export default mongoose.model('OnedayTour', OnedayTour);

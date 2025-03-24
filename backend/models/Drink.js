import mongoose from 'mongoose';

const drinkSchema = new mongoose.Schema({
     name: { type: String, required: true },
     type: { type: String, enum: ["Cocktail", "Mocktail", "Other"], required: true },
     ingredients: { type: [String], required: true },
     recipe: { type: String, required: true },
     image: { type: String, },
     inspiredBy: { type: String, required: true },
     rating: { type: Number, default: 0 },
}, { timestamps: true });


export default mongoose.model('Drink', drinkSchema);
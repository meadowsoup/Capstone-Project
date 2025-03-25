import mongoose from 'mongoose';

// review
const reviewSchema = new mongoose.Schema({
     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
     rating: { type: Number, min: 1, max: 5, required: true },
     comment: { type: String, required: true },
     createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const drinkSchema = new mongoose.Schema({
     name: { type: String, required: true },
     type: { type: String, enum: ["Cocktail", "Mocktail", "Other"], required: true },
     ingredients: { type: [String], required: true },
     recipe: { type: String, required: true },
     image: { type: String, },
     inspiredBy: { type: String, enum: ["Anime", "Video Game", "Original"], required: true }, // update: inspired by anime, video game, or original
     reviews: [reviewSchema], // update: add reviews (array of reviewSchema(embedded sub-document))
     rating: { type: Number, default: 0 },
}, { timestamps: true });


export default mongoose.model('Drink', drinkSchema);
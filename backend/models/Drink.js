import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log("Connected to MongoDB"))
.catch((e) => console.error(e));

// Review schema for reviews of each drink
const reviewSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    rating: { 
        type: Number, 
        min: 1, 
        max: 5, 
        required: true 
    },
    comment: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

// Drink schema for defining the structure of each drink object
const drinkSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ["Cocktail", "Mocktail", "Other"], 
        required: true 
    },
    ingredients: { 
        type: [String], 
        required: true 
    },
    recipe: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String,  // Optional field (no 'required' attribute)
    },
    inspiredBy: { 
        type: String, 
        enum: ["Anime", "Video Game"], 
        required: true // Only allows "Anime" or "Video Game" as valid entries
    },
    title: { 
        type: String, 
        required: true // The title (e.g., the name of the anime or video game) is required
    },
    reviews: [reviewSchema],  // Array of review sub-documents to store user reviews for the drink
    rating: { 
        type: Number, 
        default: 0  // Default rating is 0 until reviews are added
    },
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' fields

// Export the Drink model to be used in other parts of the application
export default mongoose.model('Drink', drinkSchema);

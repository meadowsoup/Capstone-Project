import express from 'express';
import Drink from '../models/Drink.js';
import { requireAuth } from '../middleware/authMidware.js';
import { validateDrink } from '../middleware/validateDrink.js';

export const drinkRouter = express.Router();

// Get all drinks
drinkRouter.get('/', async (req, res) => {
    try {
        const drinks = await Drink.find();
        res.json(drinks);
    } catch (error) {
        res.status(500).json({ error: "Error fetching drinks" });
    }
});

// Get a specific drink by search query
drinkRouter.get('/search', async (req, res) => {
    try {
        const { name, type, inspiredBy } = req.query;
        let query = {};

        if (name) query.name = new RegExp(name, 'i'); // case-insensitive search
        if (type) query.type = type;
        if (inspiredBy) query.inspiredBy = inspiredBy;

        const drinks = await Drink.find(query);
        res.json(drinks);
    } catch (error) {
        res.status(500).json({ error: "Search failed" });
    }
});

// Get a specific drink by id
drinkRouter.get('/:id', async (req, res) => {
    try {
        const drink = await Drink.findById(req.params.id);
        if (!drink) {
            return res.status(404).json({ error: "Drink not found" });
        }
        res.json(drink);
    } catch (error) {
        res.status(500).json({ error: "Error fetching drink" });
    }
});

// Create a new drink with authentication and validation
drinkRouter.post('/', requireAuth, validateDrink, async (req, res) => {
    try {
        // Validate the incoming data
        const { name, type, inspiredBy, title, ingredients, recipe, image } = req.body;
        if (!name || !type || !inspiredBy || !title || !ingredients || !recipe) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Create a new drink instance
        const newDrink = new Drink({
            name, type, inspiredBy, title, ingredients, recipe, image
        });

        // Save the drink to the database
        const savedDrink = await newDrink.save();
        res.status(201).json({ message: "Drink added successfully", drink: savedDrink }); // Return the saved drink
    } catch (error) {
        console.error("Error adding drink:", error);
        res.status(500).json({ error: "Error adding drink" });
    }
});

// Add a new review to a drink
drinkRouter.post('/:id/reviews', requireAuth, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const drink = await Drink.findById(req.params.id);
        if (!drink) {
            return res.status(404).json({ error: "Drink not found" });
        }

        // Create a new review object
        const review = {
            user: req.session.user._id,
            rating,
            comment
        };

        // Push the review into the drink's reviews array
        drink.reviews.push(review);

        // Recalculate the average rating
        const totalRating = drink.reviews.reduce((acc, review) => acc + review.rating, 0);
        drink.rating = totalRating / drink.reviews.length;

        // Save the updated drink object
        await drink.save();
        res.json({ message: "Review added successfully", drink });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ error: "Error adding review" });
    }
});

export default drinkRouter;

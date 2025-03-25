import express from 'express';
import User from '../models/User.js';
import Drink from '../models/Drink.js';
import {requireAuth} from '../middleware/authMidware.js';

export const userRouter = express.Router();

// Get all users favorite drinks
userRouter.get('/favorites', requireAuth, async (req, res) => {
     try {
          const user = await User.findById(req.session.user).populate("favorites");
          res.json(user.favorites);
     } catch (error) {
          res.status(500).json({ error: "Could not get favorites" });
     }
});

// Add a drink to favorites
userRouter.post('/favorites/:id', requireAuth, async (req, res) => {
     try {
          const user = await User.findById(req.session.user);
          const drink = await Drink.findById(req.params.drinkId);
          if (!drink) {
               return res.status(404).json({ error: "Drink not found" });
          }
          if (!user.favorites.includes(drink._id)) {
               user.favorites.push(drink._id);
               await user.save();
          }
          res.json({ message: "Drink added to favorites", favorites: user.favorites });
     } catch (error) {
          res.status(500).json({ error: "Could not add drink to favorites" }); // (maybe 500)
     }
});

// Remove a drink from favorites
userRouter.delete('/favorites/:id', requireAuth, async (req, res) => {
     try {
          const user = await User.findById(req.session.user);
          const drink = await Drink.findById(req.params.drinkId);
          if (!drink) {
               return res.status(404).json({ error: "Drink not found" });
          }
          user.favorites = user.favorites.filter((id) => id.toString() !== drink._id.toString());
          await user.save();
          res.json({ message: "Drink removed from favorites", favorites: user.favorites });
     } catch (error) {
          res.status(500).json({ error: "Could not remove drink from favorites" }); // (maybe 500)
     }
});


export default userRouter;
// In this code snippet, we define a router for handling user-related requests.
import express from 'express';
import Pairing from '../models/Pairing.js';
import Drink from '../models/Drink.js';


export const pairingRouter = express.Router();

// Get all pairings
pairingRouter.get('/', async (req, res) => {
     try {
          const pairings = await Pairing.find().populate('drink');
          res.json(pairings);
     } catch (error) {
          res.status(500).json({ error: "Error fetching pairings" });
     }
});

// Add a new pairing
pairingRouter.post('/', async (req, res) => {
     try {
          const { animeOrGame, drinkId, reason } = req.body;
          const drink = await Drink.findById(drinkId);
          
          if (!drink) {
               return res.status(404).json({ error: "Drink not found" });
          }
          
          const pairing = new Pairing({ animeOrGame, drink: drinkId, reason });
          await pairing.save();
          res.status(201).json(pairing);
     } catch (error) {
          res.status(400).json({ error: "Error adding pairing" });
     }
});

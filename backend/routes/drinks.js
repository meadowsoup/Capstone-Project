import express from 'express';
import { Drink } from '../models/Drink.js';


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

// Add a new drink
drinkRouter.post('/', async (req, res) => {
     try {
          const drink = new Drink(req.body);
          await drink.save();
          res.status(201).json(drink);
     } catch (error) {
          res.status(400).json({ error: "Error adding drink" });
     }
});


export default drinkRouter;
// In this code snippet, we define a router for handling drink-related requests. 
// The router is created using the express.Router() method, which returns a new router object. 
// We then define two routes for handling GET and POST requests to the /drinks endpoint. 
// The GET route fetches all drinks from the database using the Drink model's find() method and returns them as a JSON response. 
// The POST route creates a new drink object using the request body and saves it to the database using the save() method. 
// If the operation is successful, the new drink object is returned as a JSON response with a status code of 201 (Created). 
// If an error occurs, an error message is returned with a status code of 400 (Bad Request). 
// The drinkRouter object is exported as a default module, which can be imported and used in other parts of the application.    
import express from 'express';
import Drink from '../models/Drink.js';
import {requireAuth} from '../middleware/authMidware.js';
import {validateDrink} from '../middleware/validateDrink.js';


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


// Get a specific drink
drinkRouter.get('/search', async (req, res) => {
     try {
          const { name, type, inspiration } = req.query;
          let query = {};

          if (name) query.name = new RegExp(name, 'i'); // case-insensitive search
          if (type) query.type = type;
          if (inspiration) query.inspiration = inspiration;

          const drinks = await Drink.find(query);
          res.json(drinks);
     } catch (error) {
          res.status(500).json({ error: "Search failed" });
     }
});


// Add a new drink
// drinkRouter.post('/', async (req, res) => {
//      try {
//           const drink = new Drink(req.body);
//           await drink.save();
//           res.status(201).json(drink);
//      } catch (error) {
//           res.status(400).json({ error: "Error adding drink" });
//      }
// });


// Create a new drink
drinkRouter.post('/', async (req, res) => {
     console.log("Incoming request body:", req.body);
     try {
          const { name, type, inspiredBy, ingredients, recipe, imageURL } = req.body;

          if (!name || !type || !inspiredBy || !ingredients || !recipe || !imageURL) {
               return res.status(400).json({ error: "Missing required fields" });
          }

          const newDrink = new Drink({ name, type, inspiredBy, ingredients, recipe, imageURL });
          const savedDrink = await newDrink.save();
          res.status(201).json(savedDrink); // return the saved drink
     } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error adding drink" });
     }
});



// for validation
drinkRouter.post('/', requireAuth, validateDrink, async (req, res) => {
     try {
          const drink = new Drink(req.body);
          await drink.save();
          res.status(201).json(drink);
     } catch (error) {
          res.status(400).json({ error: "Error adding drink" });
     }
});


// Add a new review to a drink
drinkRouter.post('/:id/reviews', requireAuth, async(req, res) => {
     try {
          const { rating, comment } = req.body;
          const drink = await Drink.findById(req.params.id);
          if (!drink) {
               return res.status(404).json({ error: "Drink not found" });
          }

          // create a new review
          const review = {
               user: req.session.user._id,
               rating,
               comment
          };
          drink.reviews.push(review);

          // calculate new rating
          const totalRating = drink.reviews.reduce((acc, review) => acc + review.rating, 0);
          drink.rating = totalRating / drink.reviews.length;

          await drink.save();
          res.json({ message: "Review added successfully", drink });
     } catch (error) {
          res.status(500).json({ error: "Error adding review" }); // (maybe 500)
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
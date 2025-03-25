//* Validating drink data before saving it to the database


export const validateDrink = (req, res, next) => {
     const { name, type, inspiration, ingredients, instructions } = req.body;
     if (!name || !type || !inspiration || !ingredients || !instructions) {
          return res.status(400).json({ error: "Missing required fields" });
     }
     next();
};
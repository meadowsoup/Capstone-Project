//* Validating drink data before saving it to the database


export const validateDrink = (req, res, next) => {
     const { name, type, inspiredBy, ingredients, recipe } = req.body;
     if (!name || !type || !inspiredBy || !ingredients || !recipe) {
          return res.status(400).json({ error: "Missing required fields" });
     }
     next();
};
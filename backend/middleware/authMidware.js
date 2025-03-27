//* To protect routes!
//todo - In the routes/drinks.js file, we have defined two routes for handling GET and POST requests to the /drinks endpoint.
//todo - We can protect these routes by adding a middleware function that checks if the user is authenticated before allowing access to the routes.
//todo - Create a new file in the middleware folder and add the following code:


// export const requireAuth = (req, res, next) => {
//      if (!req.session.user) {
//           return res.status(401).json({ error: "Unauthorized" });
//      }
//      next ();
// };

export const requireAuth = (req, res, next) => {
     if (!req.session || !req.session.user) {
         return res.status(401).json({ error: "Authentication required" });
     }
     next();
 };
 
 // Admin check middleware
 export const requireAdmin = (req, res, next) => {
     if (req.session.user.role !== 'admin') {
         return res.status(403).json({ error: "Access denied" });
     }
     next();
 };
 
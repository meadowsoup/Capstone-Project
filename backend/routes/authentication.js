import express from 'express';
import {User} from '../models/User.js';


const authenticationRouter = express.Router();

// Register
authenticationRouter.post('/register', async (req, res) => {
     try {
          const { username, email, password } = req.body;

          // check if username exists
          const userExists = await User.findOne({ username });
          if (userExists) {
               return res.status(400).send("Username already exists");
          }
          // create new user
          const newUser = new User({ username, email });
          newUser.setPassword(password);
          await newUser.save();
          res.status(201).send("User created successfully");

     } catch (error) {
          res.status(500).send("Something went wrong");
     }
});

// Login
authenticationRouter.post('/login', async (req, res) => {
     try {
          const { username, password } = req.body;
          const user = await User.findOne({ username });
          if (!user || !user.validatePassword(password)) {
               return res.status(401).json("Invalid username or password");
          }
          // create session
          req.session.userId = user._id;
          res.json({ message: "Login successful" });
     } catch (error) {
          res.status(500).json({error: "Login failed"});
     }
});

// Logout
authenticationRouter.post('/logout', (req, res) => {
     req.session.destroy();
     res.json({ message: "Logout successful" });
});


// The authenticationRouter is a router that handles user authentication routes.
export { authenticationRouter };

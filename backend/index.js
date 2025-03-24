import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import session from 'express-session'; // for auth routes

// Routers
import { drinksRouter } from './routes/drinks.js';
import { pairingsRouter } from './routes/pairings.js';
import { authenticationRouter } from './routes/authentication.js'; // The authenticationRouter is a router that handles user authentication routes.

dotenv.config();
// console.log(process.env.MONGODB_URI);

// Connect to MongoDB
await mongoose
     .connect(process.env.MONGODB_URI)
     .then(() => console.log("Connect to MongoDB"))
     .catch((e) => console.error(e))

const PORT = process.env.PORT || 4000;

const app = express();

// View Engine
app.set('views', "./views");
app.set("view engine", "pug");

// Middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use(session({ // for auth
     secret: process.env.SESSION_SECRET || "supersecret",
     resave: false,
     saveUninitialized: false,
}))

// Routes
app.get('/', (req, res) => {
     res.render("index")
});

// API Routes
app.use('/api/drinks', drinksRouter);
app.use('/api/pairings', pairingsRouter);
app.use('/api/auth', authenticationRouter);

// Global Error Handler
app.use((err, _req, res, next) => {
     console.error(err);
     res.status(500).send("Seems like we messed up somewhere...");
   });


app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));






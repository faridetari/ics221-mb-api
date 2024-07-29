import 'dotenv/config'; // Load environment variables from .env

// mongodb connection via mongoose
import './db.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import apiRouter from './routes/api-router.js';
import rateLimit from 'express-rate-limit';
<<<<<<< HEAD


// Set up rate limiting

import passport from 'passport';


=======
import passport from 'passport';

>>>>>>> add-logging-in
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 requests per `window` (here, per minute)
});

const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());
<<<<<<< HEAD


// Activate rate limiter
app.use(limiter);


app.use(limiter); // Append rate limiter here
app.use(passport.initialize());

=======
app.use(limiter); // Append rate limiter here
app.use(passport.initialize());
>>>>>>> add-logging-in
// Routing
app.get('/', (req, res) => {
    res.send('Node.js Server is live!');
});
app.use('/v1', apiRouter);

export default app;

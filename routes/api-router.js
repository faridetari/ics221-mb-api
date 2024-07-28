import express from 'express';
import passport from 'passport';
import { getAllMessages, addNewMessage } from '../controllers/msg-api-controller.js';
import { registerNewUser, logInUser } from '../controllers/user-api-controller.js'; // Import the handler for the /users POST request and the logInUser function

const router = express.Router();

router.route('/messages')
    .get(getAllMessages)
    .post(passport.authenticate('jwt', { session: false }), addNewMessage); // Modify to use JWT Authentication

router.route('/users')
    .post(registerNewUser); // Add the /users route for POST requests

router.route('/login')
    .post(passport.authenticate('local', { session: false }), logInUser); // Add the /login route for POST requests using Local Authentication

export default router;

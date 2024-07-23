import express from 'express';
import passport from 'passport';
import { getAllMessages, addNewMessage } from '../controllers/msg-api-controller.js';
import { registerNewUser } from '../controllers/user-api-controller.js'; // Import the handler for the /users POST request

const router = express.Router();

router.route('/messages')
    .get(getAllMessages)
    .post(passport.authenticate('basic', { session: false }), addNewMessage); // Modify to use Basic Authentication

router.route('/users')
    .post(registerNewUser); // Add the /users route for POST requests

export default router;

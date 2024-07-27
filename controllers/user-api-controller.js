import mongoose from 'mongoose';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';


// Initialize a reference to your User Model
const userModel = mongoose.model('user');

// Helper function to determine if email or username already exists in the DB. Returns true or false.
const alreadyExists = async (email, username) => (
    await userModel.exists({
        '$or': [
            { email: email },
            { username: username }
        ]
    })
);

// Basic handler for registering a new user to test routing
const registerNewUser = async (req, res) => {
    try {
        // Check if the email or username already exists
        const exists = await alreadyExists(req.body.email, req.body.username);
        if (exists) {
            return res.status(403).json({ message: 'Username or email already exists.' });
        }

        // Create a new user
        const newUser = new userModel(req.body);
        await newUser.save();
        return res.status(201).json(newUser.toJSON());
    } catch (error) {
        res.status(400).json({ message: 'Bad Request. The User in the body of the Request is either missing or malformed.', error: error.message });
    }
};

// Configure Basic Authentication Strategy
passport.use(new BasicStrategy(
    async (userIdent, password, done) => {
        try {
            const user = await userModel.findOne({
                '$or': [
                    { email: userIdent },
                    { username: userIdent }
                ]
            }).exec();
            // user wasn't found
            if (!user) return done(null, false);
            // user was found, see if it's a valid password
            if (!await user.verifyPassword(password)) {
                // password not valid
                return done(null, false);
            }
            // valid password, return user
            return done(null, user);
        } catch (error) {
            // error searching for user
            return done(error);
        }
    }
));

// Login Handler
const logInUser = (req, res) => {
    res.status(200).send('Successful API Login Request');
};

// Export the registerNewUser and logInUser functions
export { registerNewUser, logInUser };

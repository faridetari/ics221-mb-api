import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import jwt from 'jsonwebtoken';

<<<<<<< HEAD
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

=======
>>>>>>> add-logging-in
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

// Configure Local Authentication Strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await userModel.findOne({
                '$or': [
                    { email: username },
                    { username: username }
                ]
            }).exec();
            // user wasn't found
            if (!user) return done(null, false, { message: 'Incorrect username or password.' });
            // user was found, see if it's a valid password
            if (!await user.verifyPassword(password)) {
                // password not valid
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            // valid password, return user
            return done(null, user);
        } catch (error) {
            // error searching for user
            return done(error);
        }
    }
));

<<<<<<< HEAD
passport.use(new JwtStrategy(
    jwtOptions, async (jwt_payload, done) => {
        try {
            const user = await userModel.findById(jwt_payload.sub).exec();
            if (!user) {
                // user wasn't found
                return done(null, false);
            } else {
                // user found!
                return done(null, user);
            }
        } catch (error) {
            // error in searching for user
            return done(error);
        }
    }
));

=======
>>>>>>> add-logging-in
// Login Handler
const logInUser = (req, res) => {
    // Comment out the test code
    // res.status(200).send('Successful API Login Request');

    // Generate a JWT token
    jwt.sign(
        {
            sub: req.user._id,
            username: req.user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '20m' },
        (error, token) => {
            if (error) {
                res.status(400).send('Bad Request. Couldn\'t generate token.');
            } else {
                res.status(200).json({ token });
            }
        }
    );
};

// Export the registerNewUser and logInUser functions
export { registerNewUser, logInUser };

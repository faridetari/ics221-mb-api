import mongoose from 'mongoose';

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

// Export the registerNewUser function
export { registerNewUser };

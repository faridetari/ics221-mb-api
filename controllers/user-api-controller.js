import mongoose from 'mongoose';

// Initialize a reference to your User Model
const userModel = mongoose.model('User');

// Helper function to determine if email or username already exists in the DB. Returns true or false.
const alreadyExists = async (email, username) => {
    return await userModel.exists({
        '$or': [
            { email: email },
            { username: username }
        ]
    });
};

// Implement the registerNewUser function
const registerNewUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if email or username already exists
        const exists = await alreadyExists(email, username);
        if (exists) {
            return res.status(403).json({ message: 'Email or username already exists' });
        }

        // Create a new user
        const newUser = new userModel({ email, username, password });

        await newUser.save();
        res.status(201).json(newUser.toJSON());
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Export the function
export { registerNewUser };

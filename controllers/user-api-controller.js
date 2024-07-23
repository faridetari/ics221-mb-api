import mongoose from 'mongoose';

// Initialize a reference to your User Model
const userModel = mongoose.model('user');

// Basic handler for registering a new user to test routing
const registerNewUser = async (req, res) => {
    res.status(200).send('Successful API New User POST Request');
};

// Export the registerNewUser function
export { registerNewUser };

import mongoose from 'mongoose';

// Create a new schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        description: "User's email address.",
        example: "user@example.com"
    },
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15,
        match: /^[A-Za-z0-9_-]+$/,
        description: "A registered user's username.",
        example: "Fred"
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 64,
        description: "User's password.",
        example: "password123"
    }
});

// Set JSON output behavior for the schema
userSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

// Export the user model
export default mongoose.model('user', userSchema);

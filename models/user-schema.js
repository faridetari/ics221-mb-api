import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        description: "A registered user's email address.",
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
        description: "A registered user's password.",
        example: "strongPassword123"
    }
});

// Transform JSON output
userSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password; // Do not return password hash
        return ret;
    }
});

const User = mongoose.model('User', userSchema);
export default User;

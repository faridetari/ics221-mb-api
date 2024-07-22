import mongoose from 'mongoose';
import validator from 'validator';

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format'
    }
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 15,
    match: /^[A-Za-z0-9_-]+$/,
    validate: {
      validator: function(v) {
        return /^[A-Za-z0-9_-]+$/.test(v);
      },
      message: props => `${props.value} is not a valid username!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 64
  }
});

// Set the toJSON method to control what is returned
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
export default User;

import mongoose from 'mongoose';

// Define the message schema
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 15,
    match: /^[A-Za-z0-9_]+$/
  },
  msgText: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30
  }
});

// Set options for the schema
messageSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: (doc, ret) => { delete ret._id; }
});

// Export the model
const Message = mongoose.model('Message', messageSchema);
export default Message;

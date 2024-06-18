// import yup from 'yup';
// Data Schema for a New Message
// Matches the one from the front-end App!

import mongoose from 'mongoose';

// const messageSchema = yup.object().shape({
// name: yup
//   .string()
//   .trim()
//   .min(3, 'Your name must be at least ${min} characters.')
//   .max(15, 'Your name cannot be more than ${max} characters.')
//   .matches(/^[A-Za-z0-9_]+$/, 'Invalid name. Use upper or lower case letters, 0 to 9, or underscore only.')
//   .required('Your name is required.'),
// msgText: yup
//   .string()
//   .trim()
//   .min(2, 'Your message must be at least ${min} characters.')
//   .max(30, 'Your message must be no more than ${max} characters')
//   .required('A message is required.')
// });

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

messageSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: (doc, ret) => { delete ret._id; }
});

// export default messageSchema;
export default mongoose.model('message', messageSchema);

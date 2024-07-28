// Import necessary schemas
import './models/message-schema.js';
import './models/user-schema.js'; // Import User Schema
import mongoose from 'mongoose';

// Connect to locally running MongoDB instance
let dbURI = 'mongodb://localhost:27017/msgs_db';
mongoose.set('strictQuery', true);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Print message to console when connected to DB
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
});

// Print error message to console if there is a problem connecting
mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
});

// Print message to console when disconnected from DB
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

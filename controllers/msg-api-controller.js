import Message from '../models/message-schema.js';

// GET Request Handler
const getAllMessages = async (req, res) => {
    try {
        let messages = await Message.find({}, '', { sort: { _id: -1 } }).exec();
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).send('Bad Request');
    }
};

// POST Request Handler
const addNewMessage = async (req, res) => {
    try {
        // Add the new message to the MongoDB collection
        let message = await Message.create(req.body);
        
        // Log the new message to verify the addition
        console.log(message);

        // Respond with '201 Created' Status Code and the message, as JSON, in the body of the response
        res.status(201).json(message);
    } catch (err) {
        res.status(400).send('Bad Request. The message in the body of the request is either missing or malformed. ' + err);
    }
};
export { getAllMessages, addNewMessage };

import messageSchema from '../models/message-schema.js';

const messages = [
    { id: "1", myName: "Bill", mySentence: "Hi All!" },
    { id: "2", myName: "Ann", mySentence: "ICS 221 is fun!" },
    { id: "3", myName: "Johnny", mySentence: "I'm Stranded" },
    { id: "4", myName: "Barb", mySentence: "Hi" },
    { id: "5", myName: "Frank", mySentence: "Who's tried?" },
    { id: "6", myName: "Sarah", mySentence: "I heart React" },
];

// GET Request Handler
const getAllMessages = (req, res) => {
    try {
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).send('Bad Request');
    }
};

// POST Request Handler
const addNewMessage = async (req, res) => {
    try {
        let message = await messageSchema.validate(req.body);
        message.id = (messages.length + 1).toString();
        
        // Add the message as the first element of the array
        messages.unshift(message);
        
        // Log the updated messages array to verify the addition
        console.log(messages);

        // Respond with '201 Created' Status Code and the message, as JSON, in the body of the response
        res.status(201).json(message);
    } catch (err) {
        res.status(400).send('Bad Request. The message in the body of the request is either missing or malformed. ' + err);
    }
};

export { getAllMessages, addNewMessage };

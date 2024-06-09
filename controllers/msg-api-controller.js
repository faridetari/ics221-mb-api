

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
    res.status(200).send('Successful API GET Request');
    };
    // POST Request Handler
const addNewMessage = async (req, res) => {
    res.status(200).send('Successful API POST Request');
    };
    export { getAllMessages, addNewMessage };
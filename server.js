import app from './express.js';
const port = process.env.PORT || 3003;
app.listen(port, (err) => {
if (err) console.log(err);
console.info(`Server started on port ${port}.`);
});
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Player = require('./model/playersModel')

dotenv.config({ path: `${__dirname}/config.env` })
const app = require('./app')


const port = process.env.port
app.listen(port, '127.0.0.1', () => {
    console.log(`Listening on ${port}`);
})


// Database 
const DB_URI = process.env.URI.replace('<PASSWORD>', process.env.PASSWORD);

mongoose.connect(DB_URI, {
    serverApi: { version: '1', strict: true, deprecationErrors: true }
})
    .then(con => { console.log("DB CONNECTION CREATED") })
    .catch(error => console.log(error))









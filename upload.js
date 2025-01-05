const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Player = require('./model/playersModel')
const fs = require('fs');

dotenv.config({ path: `${__dirname}/config.env` })

// Database 
const DB_URI = process.env.URI.replace('<PASSWORD>', process.env.PASSWORD);

mongoose.connect(DB_URI, {
    serverApi: { version: '1', strict: true, deprecationErrors: true }
})
    .then(con => { console.log("DB CONNECTION CREATED") })
    .catch(error => console.log(error))


const players = JSON.parse(fs.readFileSync(`${__dirname}/data/players.json`, 'utf-8'));

const uploadPlayers = async function () {
    try {
        await Player.create(players);
        console.log("Data Created");
    } catch (error) {
        console.log(error);
    }

    process.exit();
}

const deletePlayers = async function () {
    try {
        await Player.deleteMany();
        console.log("Data Deleted");
    } catch (error) {
        console.log(error);
    }
    process.exit();
}

if (process.argv[2] === "--import") {
    uploadPlayers()
}
else {
    deletePlayers();
}
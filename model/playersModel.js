const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required for sign up'],
    },
    position: {
        type: [String],
        required: [true, "Player must have a position"],
        uppercase: true
    },
    currentTeam: String,
    formerTeams: {
        type: [String],
        default: []
    },
    country: {
        type: String,
        required: [true, "Player Country is required"]
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required for sign up']
    },
    salary: Number,
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    rating: {
        type: Number
    },
    numberOfGoals: {
        type: Number
    },
    images: {
        type: [String],
        default: []
    },

    __v: {
        type: String,
        select: false
    }
})


const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
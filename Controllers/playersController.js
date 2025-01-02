const fs = require('fs');

const players = JSON.parse(fs.readFileSync(`${__dirname}/../data/players.json`, 'utf-8'));

exports.getAllPlayers = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: players.length,
        data: {
            players: players
        }
    })
}

exports.getPlayerById = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: players.length,
        data: {
            players: players
        }
    })
}

exports.addPlayer = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: players.length,
        data: {
            players: players
        }
    })
}

exports.updatePlayer = (req, res) => {
    res.status(200).json({
        status: 'success',
        playerId: req.params.id,
        results: players.length,
        data: {
            players: players
        }
    })
}


exports.deletePlayer = (req, res) => {
    res.status(200).json({
        status: 'success',
        playerId: req.params.id,
        results: players.length,
        data: {
            players: players
        }
    })
}

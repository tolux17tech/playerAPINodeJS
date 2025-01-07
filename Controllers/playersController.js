const fs = require('fs');
const Player = require('../model/playersModel');
const APIFeatures = require('../utils/APIFeatures');

const players = JSON.parse(fs.readFileSync(`${__dirname}/../data/players.json`, 'utf-8'));


exports.checkId = (req, res, next, val) => {

    // if (val > 1000) {
    //     return res.status(404).json({ status: "invalid Id" })
    // }

    next();
}

exports.checkBody = (req, res, next) => {


    // if (!data.key) {
    //     return res.status(403).json({ status: "authorized" })
    // }

    next();
}


exports.topScorers = (req, res, next) => {
    req.query.fields = "name,numberOfGoals,salary";
    req.query.sort = "-numberOfGoals";
    req.query.page = 1;
    req.query.limit = 5;
    next();
}

exports.topRated = (req, res, next) => {
    req.query.fields = "name,rating,salary";
    req.query.sort = "-rating";
    req.query.page = 1;
    req.query.limit = 5;
    next();
}

exports.getAllPlayers = async (req, res) => {
    try {

        const features = new APIFeatures(Player.find(), req.query).filter().sort().paginate().selectFields();
        const players = await features.query;

        res.status(200).json({
            status: 'success',
            results: players.length,
            data: {
                players
            }
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: error,
            message: "fail"
        })
    }
}

exports.getPlayerById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Player.findById(id);
        res.status(200).json({
            status: 'success',
            results: players.length,
            data: {
                data
            }
        })
    } catch (error) {
        res.status(404).json({
            status: error.message,
            message: "fail"
        })
    }
}

exports.getPlayerByEmail = async (req, res) => {
    try {

        res.status(200).json({
            status: 'success',
            results: players.length,
            data: {
                players: players
            }
        })
    } catch (error) {

    }
}

exports.addPlayer = async (req, res) => {

    try {
        const data = await Player.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                player: data
            }
        })
    } catch (error) {
        console.log(error.message)
        res.status(404).json({
            status: error.message
        })
    }
}

exports.updatePlayer = async (req, res) => {
    try {
        const data = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({
            status: 'success',
            data: {
                players: data
            }
        })
    } catch (error) {
        res.status(404).json({
            status: error.message
        })
    }
}


exports.deletePlayer = async (req, res) => {

    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        if (player != null) {
            res.status(204).json({
                status: 'success',
                data: {
                    player
                }
            })
        }
        else {
            res.status(404).json({
                message: "Non-Existent Id",
                status: player
            })
        }

    } catch (error) {
        res.status(404).json({
            status: error.message,
            message: "Invalid Object id"
        })
    }
}

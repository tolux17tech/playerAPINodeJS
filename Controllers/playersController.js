const fs = require('fs');
const Player = require('../model/playersModel');

const players = JSON.parse(fs.readFileSync(`${__dirname}/../data/players.json`, 'utf-8'));

exports.aliasTopPlayers = (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = '-numberOfGoals,rating';
    req.query.fields = "name, country, rating, numberOfGoals, country";
    next();

}
exports.checkId = (req, res, next, val) => {

    // if (val > 1000) {
    //     return res.status(404).json({ status: "invalid Id" })
    // }

    next();
}

exports.checkBody = (req, res, next) => {
    const data = req.body;

    // if (!data.key) {
    //     return res.status(403).json({ status: "authorized" })
    // }

    next();
}



exports.getAllPlayers = async (req, res) => {
    try {
        let newQuery = { ...req.query };

        //Fields to exclude
        const excludedQuery = ['sort', 'limit', 'fields', 'page'];
        excludedQuery.forEach(field => delete newQuery[field])


        //Advanced Filtering
        let queryString = JSON.stringify(newQuery);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

        // Query
        let data = Player.find(JSON.parse(queryString));

        //Cherry Picking
        if (req.query.fields) {
            console.log(req.query.fields);
            data.select(req.query.fields.split(',').join(' '))
        }
        //Sorting fields
        if (req.query.sort) {

            data = data.sort(req.query.sort.split(',').join(' '))
        }
        else {
            data = data.sort('createdAt')
        }

        //Limiting the number of documents
        if (req.query.limit) {
            data = data.limit(req.query.limit)
        }

        //Pagination
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 100;
        const skip = (page - 1) * limit;

        data = data.skip(skip).limit(limit);

        if (req.query.page) {
            const numPlayers = await Player.countDocuments();
            if ((skip) >= numPlayers) {
                throw new Error('Limit your search by asking for only few pages')
            }
        }

        //Final Data
        const players = await data;

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
            status: error.message,
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

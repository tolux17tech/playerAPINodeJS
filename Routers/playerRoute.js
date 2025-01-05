const express = require('express')
const playerController = require('../Controllers/playersController')
const playerRouter = express.Router();



playerRouter.route('/top-5-players')
    .get(playerController.aliasTopPlayers, playerController.getAllPlayers);

playerRouter.route("/")
    .get(playerController.getAllPlayers)
    .post(playerController.addPlayer);


playerRouter.route("/:id")
    .get(playerController.getPlayerById)
    .delete(playerController.deletePlayer)
    .patch(playerController.updatePlayer);


module.exports = playerRouter;
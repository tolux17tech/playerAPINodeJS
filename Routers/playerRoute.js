const express = require('express')
const playerController = require('../Controllers/playersController')
const playerRouter = express.Router();


playerRouter.param("id", playerController.checkId)

playerRouter.route("/highest-goals")
    .get(playerController.topScorers, playerController.getAllPlayers);

playerRouter.route("/top-rated")
    .get(playerController.topRated, playerController.getAllPlayers);

playerRouter.route("/")
    .get(playerController.getAllPlayers)
    .post(playerController.checkBody, playerController.addPlayer);


playerRouter.route("/:id")
    .get(playerController.getPlayerById)
    .delete(playerController.deletePlayer)
    .patch(playerController.updatePlayer);


module.exports = playerRouter;
//Require express and initiate the Router
const playlistRouter = require(`express`).Router();
//Require the controllers that the router will point to
const playlistController = require(`../../controllers/mainControllers/playlistController`);
//Call all methods in the router that controller will utilize

playlistRouter.route('/:id')
                  .get(playlistController.index)


module.exports = playlistRouter;

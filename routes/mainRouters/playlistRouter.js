//Require express and initiate the Router
const playlistRouter = require(`express`).Router();
//Require the controllers that the router will point to
const playlistController = require(`../../controllers/mainControllers/playlistController`);
//Call all methods in the router that controller will utilize


// playlistRouter.get(`/:id/edit`, playlistController.);
//playlistRouter.get(`/new`, playlistController.addPlaylist);

playlistRouter.route(`/`)
                  .get(playlistController.index)
                  .post(playlistController.create)

playlistRouter.route('/:id')
                  .get(playlistController.getOne)
                  //.get(playlistController.listPlaylistSongs)
                  .put(playlistController.update)
                  .delete(playlistController.deleteFromPlaylistTable, playlistController.deleteFromJoinTable)

playlistRouter.route('/:id/songs')
                  .get(playlistController.listSongs)

module.exports = playlistRouter;

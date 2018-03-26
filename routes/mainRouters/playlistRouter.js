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
                  //used to get a single playlist
                  .get(playlistController.getOne)
                  .post(playlistController.addSong)
                  .put(playlistController.update)
                  .delete(playlistController.deleteFromPlaylistTable, playlistController.deleteFromJoinTable)

playlistRouter.route('/:id/songs')
                  //used to show all of the songs in each playlist
                  .get(playlistController.listSongs)

module.exports = playlistRouter;

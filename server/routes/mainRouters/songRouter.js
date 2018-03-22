const songRouter = require(`express`).Router();
const songController = require(`../../controllers/mainControllers/songController`);

// songRouter.get(`/:id/edit`, songController.getOne)
//songRouter.get(`/new`, songController.addSong)

songRouter.route(`/:id`)
              .get(songController.getOne)

              .put(songController.update)

              //used to remove songs from the playlists
              .delete(songController.destroy)

songRouter.route(`/`)
              //get all of the songs from the db
              .get(songController.index)
              // .post(songController.create)

module.exports = songRouter;

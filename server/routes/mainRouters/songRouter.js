const songRouter = require(`express`).Router();
const songController = require(`../../controllers/mainControllers/songController`);

songRouter.get(`/:id/edit`, songController.getOne)
//songRouter.get(`/new`, songController.addSong)

songRouter.route(`/:id`)
              .get(songController.getOne)
              .put(songController.update)
              .delete(songController.destroy)

songRouter.route(`/`)
              .get(songController.index)
              .post(songController.create)

module.exports = songRouter;

//Require express and initiate the Router
const mainRouter = require(`express`).Router();
//Require the controllers that the router will point to
const mainController = require(`../../controllers/mainControllers/mainController`);
//Call all methods in the router that controller will utilize
mainRouter.route(`/`)
          .get(mainController.index)
          .post(mainController.create)
          .put(mainController.update)
          .delete(mainController.destroy)
//Export the router
module.exports = mainRouter;

const apiRouter = require(`express`).Router();
//Require the controllers that the router will point to
const apiController = require(`../../controllers/apiControllers/apiController`);
//Call all methods in the router that controller will utilize


apiRouter.route(`/`)
              .post(apiController.create)


module.exports = apiRouter;

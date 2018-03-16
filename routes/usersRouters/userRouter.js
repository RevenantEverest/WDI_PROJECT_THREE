//Require express and initiate the Router
const userRouter = require(`express`).Router();
//Require the controllers that the router will point to
const userController = require(`../../controllers/mainControllers/userController`);
//Call all methods in the router that controller will utilize
userRouter.route(`/`)
          .get(userController.index)
          .post(userController.create)
          .put(userController.update)
          .delete(userController.destroy)
//Export the router
module.exports = userRouter;

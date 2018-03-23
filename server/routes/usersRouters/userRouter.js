//Require express and initiate the Router
const userRouter = require(`express`).Router();
//Require the controllers that the router will point to
const userController = require(`../../controllers/mainControllers/userController`);
//Call all methods in the router that controller will utilize
userRouter.route(`/`)
          .get(userController.checkLoggedIn)
          // .post(userController.create)

userRouter.route('/public')
          .get(userController.getPublicUsers)

userRouter.route('/user/:username')
          .get(userController.getOne)
          .put(userController.changeSecurity)

userRouter.route('/user/:username/:id')
          .get(userController.getPlaylists)
          .post(userController.newPlayList)
//Export the router
module.exports = userRouter;

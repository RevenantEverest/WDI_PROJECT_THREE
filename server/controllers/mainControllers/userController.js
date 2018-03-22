//Require the model
const userDB = require(`../../models/userModels/userDB`);

module.exports ={
  checkLoggedIn(req, res, next){
    if(req.session.user){
      console.log("Im here");
      return res.json({
                  message: "I am the user data",
                  data: req.session.user
                })
      next();
    } else {
      console.log("You are not logged in!")
    }
  },
  getOne(req, res, next){
    console.log("I made to the user controller!!!!", req.params);
    console.log('in user controller getOne()', req.params.username);
    userDB.getSingle(req.params.username)
    .then(result => {
      console.log('In getting the user! ---> ', result);
      res.json({
        message: "ok",
        data: result
      });
    })
    .catch(error => {
      next(error)
    })
  },


  changeSecurity(req, res, next){
    console.log(`I AM THE REQ.BODY!!! -----> `, req.body);
    userDB.updateSecurity(req.body)
    .then(result => {
      console.log("its been updated", result);
      res.json({
        message: "ok"
      })
    })
    .catch(err => {
      console.log(err);
    })
  },



  getPlaylists(req, res, next){
    console.log(`in get getPlaylists`, req.params.id);
    userDB.getAllPlayLists(req.params.id)
    .then(results => {
      res.json({
        message: "ok",
        data: results
      })
      //Dont forget to call next()
    })
    .catch(err => {
      next(err)
    })
  },
  newPlayList(req, res, next){
    console.log('in user controller -----> ', req.body);
    userDB.addPlaylist(req.body)
    .then(result => {
      res.json({
        message: "ok",
        data: result
      })
    })
    .catch(error => {
      next(error);
    })
  },
  create(req, res, next){
    userDB.makeOne()
    .then(result => {
      res.json({
        message:"ok",
        data: result
      })
      //Dont forget to call next()
    })
    .catch(err => {
      next(err)
    })
  },
  // update(req, res, next){
  //   userDB.updateInfo()
  //   .then(result => {
  //     res.json({
  //       message: "ok",
  //       data: result
  //     })
  //     //Dont forget to call next()
  //   })
  //   .catch(err => {
  //     next(err)
  //   })
  // },
  // destroy(req, res, next){
  //   userDB.delete()
  //   .then(() => {
  //     //Dont forget to call next()
  //   })
  //   .catch(err => {
  //     next(err)
  //   })
  // }
}

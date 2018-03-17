//Require the model
const userDB = require(`../../models/userModels/userDB`);

module.exports ={
  getOne(req, res, next){
    // console.log('in user controller getOne()', req.params.username);

    userDB.getSingle(req.params.username)
    .then(result => {
      // console.log(result);
      res.json({
        message: "ok",
        data: result
      })
    })
    .catch(error => {
      next(error)
    })
  },
  getPlaylist(req, res, next){
    console.log(`in get getPlaylist`, req.params.id);
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

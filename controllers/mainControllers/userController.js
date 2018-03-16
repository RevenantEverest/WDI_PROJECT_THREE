//Require the model
const userDB = require(`../../models/userModels/userDB`);

module.exports ={
  index(req, res, next){
    console.log(`linked`);
    userDB.getAll()
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
  update(req, res, next){
    userDB.updateInfo()
    .then(result => {
      res.json({
        message: "ok",
        data: result
      })
      //Dont forget to call next()
    })
    .catch(err => {
      next(err)
    })
  },
  destroy(req, res, next){
    userDB.delete()
    .then(() => {
      //Dont forget to call next()
    })
    .catch(err => {
      next(err)
    })
  }
}

//Require the model
const mainDB = require(`../../models/mainModels/mainDB`);

module.exports ={
  index(req, res, next){
    mainDB.getAll()
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
  getOne(req, res, next){
    mainDB.getSingle(req.params.id)
    .then(result => {
      res.json({
        message: "ok",
        data: result
      })
    })
    .catch(error => {
      next(error)
    })
  },
  create(req, res, next){
    mainDB.makeOne()
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
    mainDB.updateInfo()
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
    mainDB.delete()
    .then(() => {
      //Dont forget to call next()
    })
    .catch(err => {
      next(err)
    })
  }
}
